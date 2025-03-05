<template>
    <div class="confirmation-summary">
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking!</p>
      <div class="booking-details">
        <h3>Booking Details</h3>
        <div class="detail-row">
          <p><strong>Booking Reference:</strong></p>
          <p>{{ bookingReference }}</p>
        </div>
        <div class="detail-row">
          <p><strong>Passenger Name:</strong></p>
          <p>{{ bookingData.passengerName }}</p>
        </div>
        <div class="detail-row">
          <p><strong>Email:</strong></p>
          <p>{{ bookingData.email }}</p>
        </div>
        <div class="detail-row">
          <p><strong>Phone:</strong></p>
          <p>{{ bookingData.phone }}</p>
        </div>
        <div class="detail-row">
          <p><strong>Baggage:</strong></p>
          <p>{{ bookingData.baggage }} INR</p>
        </div>
        <div class="detail-row">
          <p><strong>Seat:</strong></p>
          <p>{{ bookingData.seat.seatNo }} ({{ bookingData.seat.price }} INR)</p>
        </div>
        <div class="detail-row">
          <p><strong>Meal:</strong></p>
          <p>{{ bookingData.meal.value }} ({{ bookingData.meal.price }} INR)</p>
        </div>
        <div class="detail-row total-price">
          <p><strong>Total Price:</strong></p>
          <p>{{ bookingData.totalPrice }} INR</p>
        </div>
      </div>
      <div class="actions">
        <button @click="downloadTicket">Download Ticket</button>
        <button @click="emailTicket">Email Ticket</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex'
  import jsPDF from 'jspdf'
  import emailjs from 'emailjs-com'
  
  export default {
    setup() {
      const store = useStore()
      const bookingData = store.getters['booking/bookingData']
      console.log(bookingData)
  
      // Generate a unique booking reference number
      const bookingReference = `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  
      const downloadTicket = () => {
        const doc = new jsPDF();

        doc.text('Booking Confirmation', 10, 10);
        doc.text(`Booking Reference: ${bookingReference}`, 10, 20);
        doc.text(`Passenger Name: ${bookingData.passengerName}`, 10, 30);
        doc.text(`Email: ${bookingData.email}`, 10, 40);
        doc.text(`Phone: ${bookingData.phone}`, 10, 50);
        doc.text(`Baggage: ${bookingData.baggage} INR`, 10, 70);
        doc.text(`Seat: ${bookingData.seat.value} (${bookingData.seat.price} INR)`, 10, 80);
        doc.text(`Meal: ${bookingData.meal.value} (${bookingData.meal.price} INR)`, 10, 90);
        doc.text(`Total Price: ${bookingData.totalPrice} INR`, 10, 100);

        doc.save('ticket.pdf');
      }
  
      const emailTicket = () => {
        const templateParams = {
            bookingReference,
            passengerName: bookingData.passengerName,
            email: bookingData.email,
            phone: bookingData.phone,
            flightId: bookingData.flightId,
            baggage: bookingData.baggage,
            seat: `${bookingData.seat.value} (${bookingData.seat.price} INR)`,
            meal: `${bookingData.meal.value} (${bookingData.meal.price} INR)`,
            totalPrice: bookingData.totalPrice
        }

        emailjs.send('service_tp5zd0e', 'template_subhv6a', templateParams, 'YbtPfRnceyY_aBU6k')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Ticket emailed!');
        }, (error) => {
          console.log('FAILED...', error);
          alert('Failed to email ticket.');
        })
      }
  
      return { bookingData, bookingReference, downloadTicket, emailTicket }
    }
  };
  </script>
  
  <style scoped>
  .confirmation-summary {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .booking-details {
    margin-top: 20px;
    text-align: left;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .detail-row {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .detail-row:last-child {
    border-bottom: none;
  }
  .total-price {
    font-weight: bold;
    font-size: 1.2em;
  }
  .actions {
    margin-top: 20px;
  }
  .actions button {
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background 0.3s;
  }
  .actions button:hover {
    background: #0056b3;
  }
  </style>
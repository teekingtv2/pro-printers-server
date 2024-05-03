const { log } = require('console');
const { fetcher_tiqwa } = require('../../api/fetcher');
const { sender_tiqwa } = require('../../api/sender');
const FlightBooking = require('../../models/FlightBooking');
const { sendError } = require('../../utils/helpers');
const User = require('../../models/user/User');

const fetchAirports = async (req, res) => {
  const response = await fetcher_tiqwa('/airports');
  if (response?.status === 200) {
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

const fetchAirlines = async (req, res) => {
  const response = await fetcher_tiqwa('/airports');
  if (response?.status === 200) {
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

const flightOfferSearch = async (req, res, next) => {
  const response = await fetcher_tiqwa('/flight/search', req.body);
  if (response?.status === 200) {
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

const confirmFlightPrice = async (req, res) => {
  const { flight_id } = req.params;
  const response = await fetcher_tiqwa(`/flight/confirm_price/${flight_id}`);
  if (response?.status === 200) {
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

const bookFlight = async (req, res) => {
  const { flight_id } = req.params;
  const userId = req.id;
  const { contact_details, passenger_details } = req.body;
  const client = passenger_details[0];

  log('flight_id', flight_id);
  log('client', client);

  const user = await User.findById(userId, '-password');
  console.log(user);
  if (!user) return sendError(res, 'Sorry, please login first');

  if (user.email !== contact_details.c_email)
    return sendError(res, 'Sorry, kindly use your registered email address fr easy circle backs');

  const response = await sender_tiqwa(`/flight/book/${flight_id}`, {
    passengers: passenger_details,
  });
  log('response', response.data);
  if (response?.status === 200) {
    const contactDetails = new FlightBooking({
      owner: user._id,
      type: 'flight',
      client_name: `${client.first_name} ${client.last_name}`,
      client_phone: client.phone_number,
      client_email: client.email,
      contact_name: `${contact_details.c_first_name} ${contact_details.c_last_name}`,
      contact_email: contact_details.c_email,
      contact_phone: contact_details.c_phone_number,
      contact_relationship: contact_details.c_relationship_to_p,
      price: response?.data?.amount,
      status: response?.data?.status,
      booking_reference: response?.data.reference,
    });
    await contactDetails.save();
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

const payForFlight = async (req, res, next) => {
  const { document_required, contact_details, passenger_details } = req.body;
};

const fetchFlightBooking = async (req, res) => {
  const { booking_reference } = req.params;
  const response = await fetcher_tiqwa(`/flight/${booking_reference}`);
  log('response', response.data);
  if (response?.status === 200) {
    return res.status(response.status).json({ success: true, data: response.data });
  } else {
    return sendError(res, response?.data.message, response?.status);
  }
};

module.exports = {
  fetchAirports,
  fetchAirlines,
  flightOfferSearch,
  confirmFlightPrice,
  bookFlight,
  fetchFlightBooking,
};

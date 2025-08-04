const { Booking, User, Show, Movie, Theater, BookingSeat } = require('../../models');

/**
 * Fetches all confirmed bookings to be displayed in the admin dashboard.
 * Includes user's name and email, and full details about the show and seats.
 */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { status: 'confirmed' }, // Fetch only confirmed tickets
      include: [
        {
          model: User,
          attributes: ['name', 'email'] // Include the user's name and email with each booking
        },
        {
          model: Show,
          include: [
            { model: Movie, attributes: ['title', 'poster_url'] },
            { model: Theater, attributes: ['name', 'city'] }
          ]
        },
        {
          model: BookingSeat,
          attributes: ['seat_identifier'] // Include the specific seats booked
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ message: "Error fetching booking history: " + error.message });
  }
};
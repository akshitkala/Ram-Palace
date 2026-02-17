// Event cards data for home page
export const eventCards = [
  {
    id: 1,
    title: "Weddings & Receptions",
    description: "Ram Palace offers a beautifully designed banquet space for weddings and receptions, creating a refined setting for celebrations filled with joy, tradition, and timeless elegance.",
    image: "/src/assets/images/Events/wedding.webp",
    link: "/events/weddings"
  },
  {
    id: 2,
    title: "Corporate Events",
    description: "Host professional conferences, seminars, and corporate gatherings in our sophisticated venue equipped with modern amenities and premium catering services.",
    image: "/src/assets/images/Events/birthday.webp",
    link: "/events/corporate-events"
  },
  {
    id: 3,
    title: "Private Parties",
    description: "Celebrate birthdays, anniversaries, and family gatherings in a warm banquet environment designed for joyful moments, comfort, and memorable experiences.",
    image: "/src/assets/images/Events/birthday.webp",
    link: "/events/private-parties"
  }
];

// Detailed event page data with Storytelling Structure
export const eventDetails = {
  weddings: {
    hero: {
      title: "Weddings & Receptions",
      subtitle: "Where Dreams Meet Elegance",
      image: "/src/assets/images/Events/wedding.webp"
    },
    intro: {
      heading: "A Celebration of Love",
      description: "Your wedding day is a tapestry of beautiful moments. At Ram Palace, we provide the perfect canvas for your love story, blending traditional grandeur with modern sophistication."
    },
    storySections: [
      {
        id: 1,
        title: "The Grand Entrance",
        description: "Make a statement as you step into a world of elegance. Our spacious entrance and foyer are designed to give you and your guests a royal welcome, setting the tone for an unforgettable evening.",
        image: "/src/assets/images/Events/wedding.webp", 
        align: "image-left"
      },
      {
        id: 2,
        title: "Vibrant Mehendi & Sangeet",
        description: "Celebrate with color, music, and joy. Our versatile spaces can be transformed into a vibrant setting for your pre-wedding functions, complete with a dance floor and custom décor themes.",
        image: "/src/assets/images/Events/birthday.webp", // Placeholder
        align: "image-right"
      },
      {
        id: 3,
        title: "The Royal Ceremony",
        description: "Exchange vows in a setting that reflects the sanctity of the occasion. Whether it's a traditional mandap or a contemporary altar, our hall adapts to your cultural and personal preferences.",
        image: "/src/assets/images/Events/wedding.webp",
        align: "image-left"
      },
      {
        id: 4,
        title: "Exquisite Dining",
        description: "Delight your guests with a culinary journey. Our dedicated dining area ensures a comfortable and lavish feast, with a menu curated to your tastes, from traditional delicacies to global cuisines.",
        image: "/src/assets/images/Events/birthday.webp", // Placeholder
        align: "image-right"
      }
    ],
    cta: {
      text: "Plan Your Wedding with Us",
      link: "/enquiry"
    }
  },
  
  corporateEvents: {
    hero: {
      title: "Corporate Events",
      subtitle: "Professional Spaces for Business Excellence",
      image: "/src/assets/images/Events/birthday.webp"
    },
    intro: {
      heading: "Elevate Your Business Gatherings",
      description: "From high-stakes board meetings to large-scale conferences, Ram Palace offers a professional environment that fosters productivity and networking."
    },
    storySections: [
      {
        id: 1,
        title: "Conferences & Seminars",
        description: "Host impactful conferences with our state-of-the-art audio-visual equipment and flexible seating arrangements. We ensure your message is heard loud and clear.",
        image: "/src/assets/images/Events/birthday.webp",
        align: "image-left"
      },
      {
        id: 2,
        title: "Networking & Galas",
        description: "Create opportunities for connection in our elegant banquet hall. Perfect for product launches, award ceremonies, and corporate dinners that leave a lasting impression.",
        image: "/src/assets/images/Events/wedding.webp", // Placeholder
        align: "image-right"
      }
    ],
    cta: {
      text: "Plan Your Corporate Event with Us",
      link: "/enquiry"
    }
  },

  privateParties: {
    hero: {
      title: "Private Parties",
      subtitle: "Celebrate Life's Special Moments",
      image: "/src/assets/images/Events/birthday.webp"
    },
    intro: {
      heading: "Joyful Gatherings",
      description: "Whether it's a milestone birthday, an anniversary, or a family reunion, we create an intimate and warm atmosphere for you to celebrate with your loved ones."
    },
    storySections: [
      {
        id: 1,
        title: "Milestone Birthdays",
        description: "Turn another year older in style. Our team helps you create a themed celebration that reflects your personality, from decor to entertainment.",
        image: "/src/assets/images/Events/birthday.webp",
        align: "image-left"
      },
      {
        id: 2,
        title: "Anniversaries & Reunions",
        description: "Relive memories and create new ones. Our hall offers the perfect blend of comfort and elegance for family gatherings that span generations.",
        image: "/src/assets/images/Events/wedding.webp", // Placeholder
        align: "image-right"
      }
    ],
    cta: {
      text: "Plan Your Party with Us",
      link: "/enquiry"
    }
  }
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Carousel } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import "../../../../scssWeb/main.css";

export default function CarruselCalendario() {
  const [events, setEvents] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const itemsToShow = isDesktopOrLaptop ? 3 : 1;

  useEffect(() => {
    const API_KEY = "AIzaSyBdnXqWktn8J5oabH4m8UnEeCR0iiIzUw0";
    const CALENDAR_ID =
      "1e337dbf0e24d3273d97c49b60bfff05501b1005d57d9ca155c4ddf53751e905@group.calendar.google.com";
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const events = response.data.items.filter((event) => {
          const eventDate = new Date(event.start.dateTime);
          return eventDate >= new Date();
        });
        console.log(events);
        console.log("Número de eventos cargados:", events.length);
        setEvents(events);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container className=" justify-content-center carousel2">
      <Carousel interval={null} indicators={false}>
        {events
          .reduce((groups, event, index) => {
            if (index % itemsToShow === 0) {
              groups.push(events.slice(index, index + itemsToShow));
            }
            return groups;
          }, [])
          .map((group, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-between w-100">
                {group.map((event, idx) => (
                  <div
                    key={event.id}
                    className={`mx-3 title-date-container ${
                      idx === Math.floor(group.length / 2) ? "active" : ""
                    }`}
                    style={{ flex: 1 }}>
                    <h3>{event.summary}</h3>
                    <p>{new Date(event.start.dateTime).toLocaleString()}</p>
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
}

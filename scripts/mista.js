const hall = document.getElementById('cinemaHall');
const movieSelect = document.getElementById('movieSelect');

const moviesData = {
    film1: new Set(['3-5', '2-8', '7-1']), // Příklad obsazených sedadel pro Film 1
    film2: new Set(['5-6', '1-3', '8-10']), // Příklad obsazených sedadel pro Film 2
    film3: new Set(['4-2', '9-7', '6-4']), // Příklad obsazených sedadel pro Film 3
    film4: new Set(['2-3', '7-8', '5-9']), // Příklad obsazených sedadel pro Film 4
    film5: new Set(['1-1', '3-5', '9-10']), // Příklad obsazených sedadel pro Film 5
};

function createSeats(selectedMovie) {
    hall.innerHTML = ''; // Vyčištění sálu před vykreslením nových sedadel

    for (let row = 1; row <= 10; row++) {
        for (let seat = 1; seat <= 10; seat++) {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');

            if (moviesData[selectedMovie] && moviesData[selectedMovie].has(`${row}-${seat}`)) {
                seatElement.classList.add('occupied');
            } else {
                seatElement.addEventListener('click', () => {
                    if (!seatElement.classList.contains('occupied')) {
                        seatElement.classList.toggle('selected');
                    } else {
                        alert('Tohle místo je již obsazeno.');
                    }
                });
            }

            hall.appendChild(seatElement);
        }
    }
}

function saveSeats() {
    const selectedSeats = document.querySelectorAll('.selected');
    const selectedMovie = movieSelect.value;

    const selectedSeatsArray = Array.from(selectedSeats).map(seat => {
        const seatLocation = seat.parentElement.children.indexOf(seat) + 1; // Index sedadla v rámci řady
        const row = Math.ceil(seatLocation / 10); // Řada sedadla
        const seatNum = seatLocation % 10 === 0 ? 10 : seatLocation % 10; // Číslo sedadla v řadě
        return `${row}-${seatNum}`;
    });

    localStorage.setItem(selectedMovie, JSON.stringify(selectedSeatsArray));
    alert('Vybraná místa byla uložena do local storage.');
}

movieSelect.addEventListener('change', function() {
    const selectedMovie = this.value;
    createSeats(selectedMovie);
});

// Při načtení stránky vykreslit sedadla pro první film
createSeats(movieSelect.value);

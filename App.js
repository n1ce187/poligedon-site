// Poligedon React App – complete conversion
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import './style1.css';
import './style2.css';
import './style3.css';

function App() {
  return (
    <Router>
      <header className="header">
        <div className="logo">
          <Link to="/">Poligedon</Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Strona Główna</Link></li>
            <li><a href="/#about">O Wydarzeniu</a></li>
            <li><a href="/#register">Zapisz się</a></li>
            <li><a href="/#location">Gdzie</a></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
            <li><Link to="/regulamin">Regulamin</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/regulamin" element={<Regulamin />} />
      </Routes>

      <Footer />
    </Router>
  );
}

function Home() {
  const [newsVisible, setNewsVisible] = useState(Array(4).fill(false));
  const toggleNews = index => {
    const copy = [...newsVisible];
    copy[index] = !copy[index];
    setNewsVisible(copy);
  };
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>10–11 maja 2025</h1>
          <h2>Zapisz się już dziś!</h2>
          <p>Dołącz do biegu Poligedon o puchar JM Rektora!</p>
          <button className="btn" onClick={() => document.getElementById('register').scrollIntoView({behavior:'smooth'})}>Zapisz się teraz</button>
        </div>
      </section>

      <section id="about" className="container">
        <h2>O Wydarzeniu</h2>
        <p>Dołącz do biegu Poligedon o puchar JM Rektora! Wydarzenie odbędzie się 10–11 maja 2025 roku w Parku Józefa Piłsudskiego w Łodzi. Czekają na Ciebie emocjonujące trasy, aktywna atmosfera i nagrody dla najlepszych.</p>
      </section>

      <section id="register" className="container">
        <RegisterForm />
      </section>

      <section id="news" className="container">
        <h2>Aktualności</h2>
        <div className="news-grid">
          {["Nowa trasa biegu!", "Zapisy ruszyły!", "Nagrody dla najlepszych", "Zostań wolontariuszem"].map((title, i) => (
            <div className="news-card" key={i}>
              <h3 className="news-title">{title}</h3>
              <p className="news-preview">{['Trasa Poligedonu została przebudowana dla lepszych emocji...', 'Nie czekaj – liczba miejsc jest ograniczona!', 'Oprócz satysfakcji, czekają nagrody rzeczowe!', 'Chcesz pomóc i zdobyć doświadczenie? Dołącz do zespołu!'][i]}</p>
              {newsVisible[i] && <div className="news-content">{['Nowa trasa zawiera więcej przeszkód terenowych i ciekawsze ukształtowanie.', 'Formularz zapisów znajduje się poniżej.', 'Najlepsi uczestnicy otrzymają medale, pakiety sponsorskie i gadżety.', 'Rekrutujemy wolontariuszy do pomocy przy organizacji biegu.'][i]}</div>}
              <button className="news-toggle" onClick={() => toggleNews(i)}>{newsVisible[i] ? 'Zwiń' : 'Czytaj więcej'}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="location" className="container map-container">
        <h2>Gdzie</h2>
        <p>Park Józefa Piłsudskiego, Łódź</p>
        <iframe src="https://www.google.com/maps?q=Park+J%C3%B3zefa+Pi%C5%82sudskiego+%C5%81%C3%B3d%C5%BA&output=embed" title="Mapa" allowFullScreen loading="lazy"></iframe>
      </section>

      <section id="sponsors" className="container">
        <h2>Nasi Sponsorzy</h2>
        <div className="sponsor-logos">
          <img src="4f.png" alt="Sponsor 4F" />
          <img src="nike.png" alt="Sponsor nike" />
          <img src="dzik.jpg" alt="Sponsor dzik" />
          <img src="jordan.png" alt="Sponsor jordan" />
        </div>
      </section>
    </main>
  );
}

function RegisterForm() {
  const [formData, setFormData] = useState({name: '', email: '', index: '', role: '', distance: '', age: '', terms: false});
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({...prev, [name]: type === 'checkbox' ? checked : value}));
  };
  const handleSubmit = e => {
    e.preventDefault();
    alert('Formularz zapisów wysłany!');
  };
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Formularz Zapisów</h2>
      <div className="form-group"><label>Imię i nazwisko</label><input type="text" name="name" onChange={handleChange} /></div>
      <div className="form-group"><label>E-mail</label><input type="email" name="email" onChange={handleChange} /></div>
      <div className="form-group"><label>Numer albumu</label><input type="text" name="index" onChange={handleChange} /></div>
      <div className="form-group"><label>Status uczestnika</label><select name="role" onChange={handleChange}><option value="">Wybierz status</option><option value="student">Student</option><option value="pracownik">Pracownik</option><option value="other">Inny</option></select></div>
      <div className="form-group"><label>Dystans</label><select name="distance" onChange={handleChange}><option value="">Wybierz dystans</option><option value="5km">5 km</option><option value="10km">10 km</option><option value="15km">15 km</option></select></div>
      <div className="form-group"><label>Wiek</label><input type="number" name="age" onChange={handleChange} /></div>
      <div className="form-group form-group--checkbox"><input type="checkbox" name="terms" onChange={handleChange} /><label>Akceptuję regulamin biegu</label></div>
      <div className="form-actions"><button type="submit" className="btn">Zarejestruj się</button></div>
    </form>
  );
}

function Contact() {
  return (
    <main className="container contact-container">
      <h1>Kontakt</h1>
      <p>Zapraszamy do kontaktu w sprawie zapisów, wolontariatu i współpracy sponsorskiej.</p>
      <ul>
        <li>Email: <a href="mailto:kontakt@poligedon.pl">kontakt@poligedon.pl</a></li>
        <li>Telefon: +48 123 456 789</li>
        <li>Adres biura: ul. Żeromskiego 116, 90-001 Łódź</li>
        <li>Godziny pracy: pon.–pt. 9:00–17:00</li>
      </ul>
    </main>
  );
}

function Gallery() {
  const [current, setCurrent] = useState('bieg_o_puchar_jm_rektora_pl_0.jpg');
  const images = ['bieg_o_puchar_jm_rektora_pl_0.jpg', 'z2.jfif', 'z3.jpg', 'zdj1.jpg'];
  return (
    <main className="gallery-carousel container">
      <h2>Galeria zdjęć</h2>
      <div className="main-image">
        <img src={current} alt="Aktualne zdjęcie" onClick={() => document.querySelector('.main-image img').classList.toggle('zoomed')} />
      </div>
      <div className="thumbnails">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`miniatura-${i}`} onClick={() => setCurrent(img)} className={current === img ? 'active' : ''} />
        ))}
      </div>
    </main>
  );
}

function Regulamin() {
  return (
    <main className="container">
      <h2>Regulamin</h2>
      <p>Pełna treść regulaminu zostanie tutaj załadowana lub dynamicznie wczytana z serwera.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/regulamin">Regulamin</Link>
          <Link to="/contact">Kontakt</Link>
        </div>
        <div className="socials">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="X / Twitter" /></a>
        </div>
      </div>
      <p>&copy; 2025 Poligedon. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
}

export default App;

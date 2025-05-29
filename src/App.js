import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import './style1.css';
import './style2.css';
import './style3.css';

// Obrazki
import bieg from './bieg.jpg';
import z2 from './z2.jfif';
import z3 from './z3.jpg';
import zdj1 from './zdj1.jpg';
import f4 from './4f.png';
import nike from './nike.png';
import jordan from './jordan.png';
import dzik from './dzik.jpg';

function App() {
  useEffect(() => {
    setTimeout(() => {
      function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
      }

      function getCookie(name) {
        return document.cookie.split('; ').reduce((acc, pair) => {
          const [k, v] = pair.split('=');
          return k === name ? decodeURIComponent(v) : acc;
        }, '');
      }

      function showConsentBanner() {
        if (document.getElementById('cookie-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #800020;
            color: white;
            padding: 16px;
            text-align: center;
            z-index: 99999;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            Ta strona używa plików cookie. Kontynuując, akceptujesz naszą politykę prywatności.
            <button id="acceptCookies" style="
              margin-left: 16px;
              padding: 8px 16px;
              background: #ffbf00;
              color: #1e1e1e;
              font-weight: bold;
              border: none;
              border-radius: 4px;
              cursor: pointer;">
              Akceptuję
            </button>
          </div>
        `;
        document.body.prepend(banner);

        document.getElementById('acceptCookies').addEventListener('click', () => {
          setCookie('cookieConsent', 'true', 365);
          banner.remove();
        });
      }

      function showWelcomeBack() {
        if (document.getElementById('welcomeBack')) return;

        const note = document.createElement('div');
        note.id = 'welcomeBack';
        note.innerHTML = `
          <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #fff;
            color: #800020;
            padding: 12px 20px;
            border: 2px solid #800020;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            font-weight: 600;
            font-size: 14px;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 12px;">
            👋 Witamy ponownie!
            <button style="
              background: transparent;
              border: none;
              font-size: 16px;
              cursor: pointer;
              color: #800020;">✖</button>
          </div>
        `;
        document.body.appendChild(note);

        note.querySelector('button').addEventListener('click', () => {
          note.remove();
        });
      }

      const consent = getCookie('cookieConsent');
      const visited = getCookie('visited');

      if (!consent) {
        showConsentBanner();
      } else if (visited !== 'true') {
        showWelcomeBack();
      }

      setCookie('visited', 'true', 1);
    }, 0);
  }, []);

  return (
    <Router>
      <header className="header">
        <div className="logo"><Link to="/">Poligedon</Link></div>
        <nav>
          <ul>
            <li><Link to="/">Strona Główna</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
            <li><Link to="/regulamin">Regulamin</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contact" element={<Kontakt />} />
        <Route path="/regulamin" element={<Regulamin />} />
      </Routes>

      <footer>
        <div className="footer-top">
          <div className="footer-links">
            <Link to="/regulamin">Regulamin</Link>
            <Link to="/contact">Kontakt</Link>
          </div>
          <div className="socials">
            <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
            </a>
            <a href="https://twitter.com/" target="_blank" aria-label="X" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="X / Twitter" />
            </a>
          </div>
        </div>
        <p>&copy; 2025 Poligedon. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </Router>
  );
}
function Home() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.news-toggle');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.previousElementSibling;
        content.classList.toggle('hidden');
        button.textContent = content.classList.contains('hidden') ? 'Czytaj więcej' : 'Zwiń';
      });
    });

    return () => {
      buttons.forEach(button => {
        const clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const form = e.target;
    let valid = true;

    valid &= validate('reg-name', v => v.trim().length >= 3, 'Imię i nazwisko musi mieć co najmniej 3 znaki.');
    valid &= validate('reg-email', v => /\S+@\S+\.\S+/.test(v), 'Podaj poprawny adres e-mail.');
    valid &= validate('reg-age', v => v >= 10 && v <= 100, 'Wiek musi być między 10 a 100 lat.');
    valid &= validate('reg-role', v => v !== '', 'Wybierz status uczestnika.');
    valid &= validate('reg-distance', v => v !== '', 'Wybierz dystans.');

    const terms = form['reg-terms'];
    if (!terms.checked) {
      showError(terms, 'Musisz zaakceptować regulamin.');
      valid = false;
    }

    if (valid) {
      alert('Formularz poprawnie wysłany!');
      form.submit();
    }
  };

  const validate = (name, testFn, message) => {
    const input = document.getElementsByName(name)[0];
    if (!testFn(input.value)) {
      showError(input, message);
      return false;
    }
    return true;
  };

  const showError = (input, message) => {
    const container = input.closest('.form-group');
    if (!container) return;

    const existingError = container.querySelector('.form-error');
    if (existingError) existingError.remove();

    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '4px';
    error.textContent = message;
    container.appendChild(error);
  };

  const clearErrors = () => {
    document.querySelectorAll('.form-error').forEach(e => e.remove());
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>10–11 maja 2025</h1>
          <h2>Zapisz się już dziś!</h2>
          <p>Dołącz do biegu Poligedon o puchar JM Rektora!</p>
          <button className="btn" onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}>
            Zapisz się teraz
          </button>
        </div>
      </section>

      <section id="about" className="container">
        <h2>O Wydarzeniu</h2>
         <p><strong>Poligedon</strong> to dynamiczne wydarzenie sportowe łączące bieg przełajowy z ekscytującymi przeszkodami terenowymi. Rozgrywa się w sercu Łodzi – w <strong>Parku Józefa Piłsudskiego</strong> – i gromadzi studentów, pracowników uczelni oraz wszystkich entuzjastów aktywnego trybu życia.</p>

  <p>To nie tylko rywalizacja o <strong>Puchar JM Rektora</strong>, ale przede wszystkim okazja do sprawdzenia własnych możliwości fizycznych i mentalnych. Trasa pełna jest naturalnych i sztucznych przeszkód: błoto, ściany wspinaczkowe, podbiegi, rowy wodne i inne niespodzianki wymagają determinacji, współpracy i hartu ducha.</p>

  <p><strong>Poligedon</strong> to również integracja, dobra zabawa i niepowtarzalna atmosfera, która łączy środowisko akademickie z lokalną społecznością. Każdy uczestnik – niezależnie od poziomu zaawansowania – znajdzie tu coś dla siebie: wyzwanie, adrenalinę i ogromną satysfakcję z przekroczenia mety.</p>

  <p><em>Nie czekaj – przygotuj się na sportową przygodę i dołącz do nas w maju 2025 roku!</em></p>
      </section>

      <section id="register" className="container">
        <form className="register-form" noValidate onSubmit={handleSubmit}>
          <h2>Formularz Zapisów</h2>
          <div className="form-group"><label>Imię i nazwisko</label><input type="text" name="reg-name" /></div>
          <div className="form-group"><label>E-mail</label><input type="email" name="reg-email" /></div>
          <div className="form-group"><label>Numer albumu</label><input type="text" name="reg-index" /></div>
          <div className="form-group"><label>Status</label><select name="reg-role"><option value="">Wybierz</option><option>Student</option><option>Pracownik</option></select></div>
          <div className="form-group"><label>Dystans</label><select name="reg-distance"><option value="">Wybierz</option><option>5km</option><option>10km</option></select></div>
          <div className="form-group"><label>Wiek</label><input type="number" name="reg-age" /></div>
          <div className="form-group form-group--checkbox">
            <input type="checkbox" name="reg-terms" id="reg-terms" />
            <label htmlFor="reg-terms">Akceptuję regulamin</label>
          </div>
          <button className="btn">Zarejestruj się</button>
        </form>
      </section>

      <section id="news" className="container">
        <h2>Aktualności</h2>
        <div className="news-grid">
          <div className="news-card">
            <h3 className="news-title">📍 Nowa trasa biegu!</h3>
            <p className="news-preview">Trasa Poligedonu została przebudowana dla lepszych emocji...</p>
            <div className="news-content hidden">
              <p>Trasa Poligedonu została gruntownie zmodyfikowana, by dostarczyć uczestnikom jeszcze więcej emocji i wyzwań. Nowe odcinki zawierają przeszkody terenowe takie jak wzniesienia, błotne rowy, ściany do wspinaczki czy czołganie się pod siatkami. Zmienione ukształtowanie terenu wymaga nie tylko siły, ale też sprytu i strategii. Ta nowa wersja zapewni niezapomniane wrażenia i przetestuje Twoją kondycję na zupełnie nowym poziomie!</p>
            </div>
            <button className="news-toggle">Czytaj więcej</button>
          </div>

          <div className="news-card">
            <h3 className="news-title">📝 Zapisy ruszyły!</h3>
            <p className="news-preview">Nie czekaj – liczba miejsc jest ograniczona!</p>
            <div className="news-content hidden">
            <p>Oficjalnie otworzyliśmy rejestrację na Poligedon 2025! Formularz zapisów znajdziesz poniżej na stronie. Nie zwlekaj – liczba miejsc jest ograniczona, a zainteresowanie rośnie z dnia na dzień. Uczestnictwo to nie tylko sportowe wyzwanie, ale też świetna okazja do wspólnej zabawy i poznania ludzi z pasją do ruchu. Zarejestruj się już dziś i dołącz do biegowego wyzwania o Puchar JM Rektora!</p>
            </div>
            <button className="news-toggle">Czytaj więcej</button>
          </div>

          <div className="news-card">
            <h3 className="news-title">🎖️ Nagrody dla najlepszych</h3>
            <p className="news-preview">Oprócz satysfakcji, czekają nagrody rzeczowe!</p>
            <div className="news-content hidden">
              <p>Zwycięzcy Poligedonu mogą liczyć nie tylko na uznanie i satysfakcję, ale również na atrakcyjne nagrody! Czekają na Was pamiątkowe medale, pakiety startowe od sponsorów, vouchery i unikalne gadżety sportowe. Doceniamy wysiłek wszystkich, dlatego każdy uczestnik otrzyma pamiątkowy certyfikat i mnóstwo pozytywnych emocji na mecie. Pokaż, na co Cię stać i sięgnij po laury!

</p>
            </div>
            <button className="news-toggle">Czytaj więcej</button>
          </div>

          <div className="news-card">
            <h3 className="news-title">🤝 Zostań wolontariuszem</h3>
            <p className="news-preview">Chcesz pomóc i zdobyć doświadczenie? Dołącz do zespołu!</p>
            <div className="news-content hidden">
              <p>Chcesz przeżyć Poligedon z innej perspektywy? Dołącz do naszego zespołu wolontariuszy i pomóż nam stworzyć wyjątkowe wydarzenie! Szukamy osób do pomocy przy obsłudze trasy, punktów informacyjnych i organizacyjnych. To doskonała okazja do zdobycia cennego doświadczenia, poznania fantastycznych ludzi i uczestnictwa w wydarzeniu pełnym sportowej pasji. Zgłoś się poprzez formularz kontaktowy!

</p>
            </div>
            <button className="news-toggle">Czytaj więcej</button>
          </div>
        </div>
      </section>

      <section id="location" className="container">
        <h2>Gdzie</h2>
        <p>
  Park Józefa Piłsudskiego w Łodzi, znany również jako "łódzki Manhattan", to zielone serce miasta i doskonała sceneria dla naszego biegu. Malownicze alejki, naturalne ukształtowanie terenu oraz bliskość miejskiej infrastruktury sprawiają, że to idealne miejsce na sportowe wyzwania. Uczestnicy mogą liczyć na zróżnicowany teren, świeże powietrze i wyjątkową atmosferę, łączącą naturę z energią miejskiego życia.
</p>
        <iframe src="https://www.google.com/maps?q=Park+Józefa+Piłsudskiego+Łódź&output=embed" width="100%" height="400" style={{ border: 0 }}></iframe>
      </section>

      <section id="sponsors" className="container">
        <h2>Nasi Sponsorzy</h2>
        <div className="sponsor-logos">
          <img src={f4} alt="Sponsor 4F" />
          <img src={nike} alt="Sponsor Nike" />
          <img src={jordan} alt="Sponsor Jordan" />
          <img src={dzik} alt="Sponsor Dzik" />
        </div>
      </section>
    </main>
  );
}

function Galeria() {
  const [current, setCurrent] = useState(bieg);
  const currentRef = useRef(null);
  const images = [bieg, z2, z3, zdj1];

  const toggleZoom = () => {
    currentRef.current?.classList.toggle('zoomed');
  };

  return (
    <main>
      <section className="gallery-carousel container">
        <h2>Galeria zdjęć</h2>
        <div className="main-image">
          <img
            ref={currentRef}
            src={current}
            alt="Aktualne zdjęcie"
            onClick={toggleZoom}
          />
        </div>
        <div className="thumbnails">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Miniatura ${i + 1}`}
              onClick={() => setCurrent(img)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}


function Kontakt() {
  useEffect(() => {
    const form = document.querySelector('.contact-container form');

    if (!form) return;

    const handleSubmit = (e) => {
      e.preventDefault();
      clearErrors();

      let valid = true;

      valid &= validate('name', v => v.trim().length >= 3, 'Imię i nazwisko musi mieć co najmniej 3 znaki.');
      valid &= validate('email', v => /\S+@\S+\.\S+/.test(v), 'Podaj poprawny adres e-mail.');
      valid &= validate('topic', v => v !== '', 'Wybierz temat wiadomości.');
      valid &= validate('message', v => v.trim().length >= 10, 'Wiadomość musi mieć co najmniej 10 znaków.');

      if (valid) {
        alert('Dziękujemy za kontakt!');
        form.submit();
      }
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };

    function validate(name, testFn, errorMessage) {
      const input = document.getElementsByName(name)[0];
      if (!testFn(input.value)) {
        showError(input, errorMessage);
        return false;
      }
      return true;
    }

    function showError(input, message) {
      const container = input.closest('.form-group');
      if (!container) return;

      const existingError = container.querySelector('.form-error');
      if (existingError) existingError.remove();

      const error = document.createElement('div');
      error.className = 'form-error';
      error.style.color = 'red';
      error.style.fontSize = '14px';
      error.style.marginTop = '4px';
      error.textContent = message;

      container.appendChild(error);
    }

    function clearErrors() {
      document.querySelectorAll('.form-error').forEach(el => el.remove());
    }
  }, []);

  return (
    <main>
      <section className="container contact-container">
        <h1>Kontakt</h1>
        <p>Masz pytania? Skontaktuj się z nami — chętnie pomożemy!</p>
<ul>
  <li>📧 Odpowiadamy na wiadomości w ciągu 24 godzin.</li>
  <li>📍 Biuro organizatora znajduje się na terenie kampusu Politechniki Łódzkiej.</li>
  <li>📞 W sprawach pilnych zadzwoń: +48 123 456 789.</li>
  <li>📅 Możesz również zapisać się na newsletter — zaznacz to w formularzu.</li>
  <li>💬 W dniu wydarzenia działają punkty informacyjne w Parku Piłsudskiego.</li>
</ul>
        <form>
          <div className="form-group">
            <label htmlFor="name">Imię</label>
            <input name="name" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="topic">Temat</label>
            <select name="topic" id="topic">
              <option value="">Wybierz</option>
              <option value="uwagi">Uwagi</option>
              <option value="media">Współpraca medialna</option>
              <option value="inne">Inne</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Wiadomość</label>
            <textarea name="message" id="message" />
          </div>
          <button className="btn" type="submit">Wyślij</button>
        </form>
      </section>
    </main>
  );
}


function Regulamin() {
  return (
    <main className="container">
      <h2>Regulamin</h2>
      <p><strong>1. Postanowienia ogólne</strong></p>
  <p>Poligedon to bieg z przeszkodami organizowany w Parku Józefa Piłsudskiego w Łodzi, który ma na celu promowanie aktywności fizycznej, integrację środowiska akademickiego oraz wspieranie ducha sportowej rywalizacji. Organizatorem wydarzenia jest uczelnia wyższa we współpracy z partnerami i sponsorami.</p>

  <p><strong>2. Termin i miejsce</strong></p>
  <p>Bieg odbędzie się w dniach 10–11 maja 2025 roku. Start i meta zlokalizowane będą na głównej polanie w Parku Józefa Piłsudskiego. Organizator zastrzega sobie prawo do zmian terminu lub trasy ze względu na czynniki niezależne, takie jak warunki atmosferyczne lub decyzje administracyjne.</p>

  <p><strong>3. Uczestnictwo</strong></p>
  <p>W wydarzeniu mogą wziąć udział studenci, pracownicy uczelni, absolwenci oraz osoby spoza społeczności akademickiej, które ukończyły co najmniej 10 lat. Osoby niepełnoletnie muszą posiadać pisemną zgodę rodzica lub opiekuna. Rejestracja jest obowiązkowa i odbywa się za pośrednictwem formularza online.</p>

  <p><strong>4. Kategorie i dystanse</strong></p>
  <p>Uczestnicy mogą wybrać jeden z dwóch dystansów: 5 km lub 10 km. Trasa zawiera przeszkody terenowe takie jak rowy wodne, ściany wspinaczkowe, niskie tunele i podbiegi. Biegacze zostaną sklasyfikowani w odpowiednich kategoriach wiekowych oraz zawodowych (student, pracownik, gość).</p>

  <p><strong>5. Opłata i zapisy</strong></p>
  <p>Udział w biegu jest bezpłatny dla studentów i pracowników uczelni. Osoby spoza społeczności akademickiej wnoszą symboliczną opłatę wpisową. Zgłoszenia należy dokonać do 5 maja 2025 roku lub do wyczerpania limitu miejsc. Organizator ma prawo zakończyć zapisy wcześniej w przypadku dużego zainteresowania.</p>

  <p><strong>6. Bezpieczeństwo</strong></p>
  <p>Każdy uczestnik bierze udział w biegu na własną odpowiedzialność. Na miejscu obecna będzie profesjonalna obsługa medyczna. Zalecane jest, aby osoby z problemami zdrowotnymi skonsultowały się z lekarzem przed udziałem. Organizator nie ponosi odpowiedzialności za kontuzje powstałe w wyniku niewłaściwego przygotowania fizycznego.</p>

  <p><strong>7. Obowiązki uczestnika</strong></p>
  <p>Każdy uczestnik zobowiązany jest do przestrzegania poleceń organizatorów, sędziów i służb porządkowych. Niedozwolone jest niszczenie przeszkód, zbaczanie z wyznaczonej trasy, używanie substancji dopingujących oraz zachowania agresywne wobec innych uczestników.</p>

  <p><strong>8. Nagrody i klasyfikacja</strong></p>
  <p>Najlepsi uczestnicy otrzymają pamiątkowe medale, nagrody rzeczowe oraz dyplomy. Klasyfikacja odbywać się będzie według czasu netto, rejestrowanego elektronicznie. W przypadku remisu, o miejscu decyduje data zapisu.</p>

  <p><strong>9. RODO i przetwarzanie danych</strong></p>
  <p>Rejestrując się, uczestnik wyraża zgodę na przetwarzanie danych osobowych zgodnie z przepisami RODO w celach organizacyjnych, promocyjnych i informacyjnych. Dane nie będą udostępniane osobom trzecim bez wyraźnej zgody uczestnika.</p>

  <p><strong>10. Zgoda na publikację wizerunku</strong></p>
  <p>Uczestnik wyraża zgodę na nieodpłatne wykorzystanie swojego wizerunku w materiałach promocyjnych, zdjęciach i relacjach wideo z wydarzenia. Organizator zastrzega sobie prawo do publikacji tych materiałów w mediach społecznościowych, na stronie internetowej i w prasie.</p>

  <p><strong>11. Zmiany regulaminu</strong></p>
  <p>Organizator zastrzega sobie prawo do wprowadzenia zmian w regulaminie do dnia wydarzenia. Aktualna wersja regulaminu dostępna będzie na stronie internetowej wydarzenia. Wszelkie zmiany będą komunikowane drogą mailową oraz poprzez media społecznościowe.</p>

  <p><strong>12. Kontakt z organizatorem</strong></p>
  <p>W przypadku pytań lub wątpliwości należy kontaktować się z biurem wydarzenia za pośrednictwem formularza na stronie lub bezpośrednio pod adresem e-mail: kontakt@poligedon.pl. Odpowiedzi udzielane są w dni robocze w godzinach 9:00–16:00.</p>

  <p><strong>13. Postanowienia końcowe</strong></p>
  <p>Uczestnictwo w wydarzeniu jest równoznaczne z akceptacją niniejszego regulaminu. Organizator dołoży wszelkich starań, by wydarzenie odbyło się w sposób bezpieczny, sprawny i zgodny z obowiązującymi przepisami. Dziękujemy za zaufanie i życzymy powodzenia!</p>

    </main>
  );
}

export default App;

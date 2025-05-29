document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.register-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let valid = true;

    valid &= validate('reg-name', v => v.trim().length >= 3, 'Imię i nazwisko musi mieć co najmniej 3 znaki.');
    valid &= validate('reg-email', v => /\S+@\S+\.\S+/.test(v), 'Podaj poprawny adres e-mail.');
    valid &= validate('reg-age', v => v >= 10 && v <= 100, 'Wiek musi być między 10 a 100 lat.');
    valid &= validate('reg-role', v => v !== '', 'Wybierz status uczestnika.');
    valid &= validate('reg-distance', v => v !== '', 'Wybierz dystans.');

    const terms = document.getElementById('reg-terms');
    if (!terms.checked) {
      showError(terms, 'Musisz zaakceptować regulamin.');
      valid = false;
    }

    if (valid) form.submit();
  });

  function validate(id, testFn, errorMessage) {
    const input = document.getElementById(id);
    if (!testFn(input.value)) {
      showError(input, errorMessage);
      return false;
    }
    return true;
  }

  function showError(input, message) {
    const container = input.closest('.form-group');
    if (!container) return;

    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '4px';
    error.textContent = message;

    // Usuń istniejący komunikat błędu (jeśli był)
    const existingError = container.querySelector('.form-error');
    if (existingError) existingError.remove();

    container.appendChild(error);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.remove());
  }
});

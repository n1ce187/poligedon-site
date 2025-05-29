document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-container form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let valid = true;

    valid &= validate('name', v => v.trim().length >= 3, 'Imię i nazwisko musi mieć co najmniej 3 znaki.');
    valid &= validate('email', v => /\S+@\S+\.\S+/.test(v), 'Podaj poprawny adres e-mail.');
    valid &= validate('topic', v => v !== '', 'Wybierz temat wiadomości.');
    valid &= validate('message', v => v.trim().length >= 10, 'Wiadomość musi mieć co najmniej 10 znaków.');

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

    const existingError = container.querySelector('.form-error');
    if (existingError) existingError.remove();

    container.appendChild(error);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.remove());
  }
});

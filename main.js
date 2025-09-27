import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@3.4.4/+esm";

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthDateValue = document.getElementById('birth-date').value;
  const resultDiv = document.getElementById('calculation-result');

  if (!birthDateValue) {
    resultDiv.textContent = 'Please enter your birth date.';
    return;
  }

  const birthDate = DateTime.fromISO(birthDateValue);
  const now = DateTime.now();

  if (birthDate > now) {
    resultDiv.textContent = 'Birth date cannot be in the future.';
    return;
  }

  const diff = now.diff(birthDate, ['years', 'months', 'days']).toObject();

  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  // Build result string dynamically
  const parts = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
  if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);

  resultDiv.textContent = parts.length > 0
    ? `You are ${parts.join(', ')} old.`
    : 'You are less than a day old.';
});
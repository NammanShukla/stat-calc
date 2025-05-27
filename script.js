function calculate() {
  event.preventDefault(); 

  const input = document.querySelector('#numbers').value;
  const numberStrings = input.split(',').map(s => s.trim());
  const numbers = numberStrings.map(Number);

  if (numbers.some(isNaN)) {
    alert('Invalid input! Only numbers are allowed');
    return;
  }

  const mean = arr => arr.reduce((sum, n) => sum + n, 0) / arr.length;

  const median = arr => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  const mode = arr => {
    const freq = {};
    let maxFreq = 0;
    let modes = [];

    arr.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });

    for (const n in freq) {
      if (freq[n] === maxFreq) modes.push(Number(n));
    }

    return modes.length === arr.length ? 'No mode' : modes.join(', ');
  };

  const range = arr => Math.max(...arr) - Math.min(...arr);

  const variance = arr => {
    const avg = mean(arr);
    return mean(arr.map(n => (n - avg) ** 2));
  };

  const stdDeviation = arr => Math.sqrt(variance(arr));


  document.querySelector('#mean').textContent = mean(numbers).toFixed(2);
  document.querySelector('#median').textContent = median(numbers);
  document.querySelector('#mode').textContent = mode(numbers);
  document.querySelector('#range').textContent = range(numbers);
  document.querySelector('#variance').textContent = variance(numbers).toFixed(2);
  document.querySelector('#standardDeviation').textContent = stdDeviation(numbers).toFixed(2);
}

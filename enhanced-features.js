(() => {
  const search = document.getElementById('scenario-search');
  const list = document.getElementById('scenario-list');
  const empty = document.getElementById('scenario-search-empty');
  if (search && list) {
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let shown = 0;
      list.querySelectorAll('button, .scenario-button, [role="button"]').forEach(item => {
        const match = !query || (item.textContent || '').toLocaleLowerCase().includes(query);
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };
    search.addEventListener('input', filter);
    const observer = new MutationObserver(filter);
    observer.observe(list, { childList: true, subtree: true });
  }

  const tips = [
    'Always verify payment status inside your own official app. Screenshots and forwarded messages are not proof of payment.',
    'You generally do not need to enter a UPI PIN just to receive money. Stop if someone asks you to do this.',
    'Never share your UPI PIN, OTP, password, or screen with a caller claiming to help you get a refund.',
    'Read the name and amount on the payment screen before approving any UPI request.',
    'Do not trust customer-care numbers sent by strangers. Find contact details on the official app or website.',
    'If you suspect financial cyber fraud, contact your bank or payment app promptly and call India’s 1930 helpline.'
  ];
  const tip = document.getElementById('daily-safety-tip');
  const count = document.getElementById('daily-safety-count');
  const next = document.getElementById('next-safety-tip');
  let index = 0;
  try { index = Number(sessionStorage.getItem('upiSafetyTipIndex') || 0) % tips.length; } catch (_) {}
  const showTip = () => { if (tip) tip.textContent = tips[index]; if (count) count.textContent = `Safety reminder ${index + 1} of ${tips.length}`; };
  showTip();
  if (next) next.addEventListener('click', () => { index = (index + 1) % tips.length; showTip(); try { sessionStorage.setItem('upiSafetyTipIndex', String(index)); } catch (_) {} });
  const copy = document.getElementById('copy-safety-checklist');
  if (copy) copy.addEventListener('click', async () => {
    const checklist = 'UPI SAFETY CHECKLIST\n1. Never share your UPI PIN or OTP.\n2. You generally do not need a PIN to receive money.\n3. Verify payments in your own official app.\n4. Do not approve unknown collect requests.\n5. Contact your bank/payment app promptly if you suspect fraud.\nIndia cyber fraud helpline: 1930\nOfficial portal: https://cybercrime.gov.in/';
    const original = copy.textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(checklist);
      else { const area = document.createElement('textarea'); area.value = checklist; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); const ok = document.execCommand('copy'); area.remove(); if (!ok) throw new Error('copy failed'); }
      copy.textContent = 'Copied ✓';
    } catch (_) { copy.textContent = 'Copy unavailable'; }
    window.setTimeout(() => { copy.textContent = original; }, 1800);
  });
})();

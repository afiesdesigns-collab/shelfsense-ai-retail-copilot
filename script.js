const liveRegion = document.getElementById('live-region');
function announce(msg) { liveRegion.textContent = msg; }

// ---------- Explainability accordion ----------
const explainToggle = document.getElementById('explain-toggle');
const explainPanel = document.getElementById('explain-panel');

explainToggle.addEventListener('click', () => {
  const expanded = explainToggle.getAttribute('aria-expanded') === 'true';
  explainToggle.setAttribute('aria-expanded', String(!expanded));
  explainPanel.hidden = expanded;
  announce(expanded ? 'Explanation collapsed.' : 'Explanation expanded.');
});

// ---------- Audit history ----------
const auditList = document.getElementById('audit-list');

function addAuditEntry(actor, text) {
  const li = document.createElement('li');
  li.className = 'actor-' + actor.toLowerCase().replace(/\s+/g, '-');
  li.innerHTML =
    '<span class="marker" aria-hidden="true"></span>' +
    '<span class="actor">' + actor + '</span>' +
    '<p class="event-text">' + text + '</p>' +
    '<span class="event-time">Just now</span>';
  auditList.appendChild(li);
}

// ---------- Edit control ----------
const qtyInput = document.getElementById('qty-input');
const originalQty = qtyInput.value;
let lastLoggedQty = originalQty;

qtyInput.addEventListener('blur', () => {
  if (qtyInput.value !== lastLoggedQty && qtyInput.value !== '') {
    addAuditEntry('You', 'Changed the recommended quantity from ' + lastLoggedQty + ' to ' + qtyInput.value + ' cases.');
    lastLoggedQty = qtyInput.value;
  }
});

// ---------- Capacity checkbox ----------
const capacityCheck = document.getElementById('capacity-check');
capacityCheck.addEventListener('change', () => {
  if (capacityCheck.checked) {
    addAuditEntry('You', 'Added a step to confirm shelf capacity with the store manager.');
  } else {
    addAuditEntry('You', 'Removed the shelf-capacity confirmation step.');
  }
});

// ---------- Decision state ----------
const approveBtn = document.getElementById('approve-btn');
const rejectBtn = document.getElementById('reject-btn');
const escalateBtn = document.getElementById('escalate-btn');
const feedbackPanel = document.getElementById('feedback-panel');
const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
const cancelFeedbackBtn = document.getElementById('cancel-feedback-btn');
const decisionBanner = document.getElementById('decision-banner');
const actionRow = document.getElementById('action-row');

function lockRecommendation() {
  qtyInput.disabled = true;
  capacityCheck.disabled = true;
  approveBtn.disabled = true;
  rejectBtn.disabled = true;
  escalateBtn.disabled = true;
  submitFeedbackBtn.disabled = true;
  cancelFeedbackBtn.disabled = true;
  feedbackPanel.hidden = true;
}

function showBanner(type, icon, title, body) {
  decisionBanner.innerHTML =
    '<div class="banner banner-' + type + '" role="status">' +
    '<span class="banner-icon" aria-hidden="true">' + icon + '</span>' +
    '<div><strong>' + title + '</strong> ' + body + '</div>' +
    '</div>';
}

approveBtn.addEventListener('click', () => {
  const capacityNote = capacityCheck.checked ? ' Shelf-capacity confirmation was requested before shipment.' : '';
  addAuditEntry('You', 'Approved the recommendation at ' + qtyInput.value + ' cases.' + capacityNote);
  showBanner('success', '&#10003;', 'Recommendation approved.', 'A draft order for ' + qtyInput.value + ' cases was created for further processing — nothing was submitted automatically.');
  announce('Recommendation approved.');
  lockRecommendation();
});

rejectBtn.addEventListener('click', () => {
  feedbackPanel.hidden = false;
  announce('Please select a reason for rejecting this recommendation.');
});

cancelFeedbackBtn.addEventListener('click', () => {
  feedbackPanel.hidden = true;
});

submitFeedbackBtn.addEventListener('click', () => {
  const reason = document.querySelector('input[name="feedback-reason"]:checked');
  if (!reason) {
    announce('Select a reason before submitting.');
    return;
  }
  addAuditEntry('You', 'Rejected the recommendation. Reason: ' + reason.value + '.');
  showBanner('danger', '&#10005;', 'Recommendation rejected.', 'Your feedback ("' + reason.value + '") has been recorded and will inform future recommendations.');
  announce('Recommendation rejected.');
  lockRecommendation();
});

escalateBtn.addEventListener('click', () => {
  addAuditEntry('You', 'Escalated this recommendation to a sales manager for review.');
  showBanner('neutral', '&#8593;', 'Escalated to manager.', 'A sales manager will review this recommendation before any action is taken.');
  announce('Recommendation escalated to manager.');
  lockRecommendation();
});

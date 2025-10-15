import { firebaseAuth, firebaseData } from 'firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// YYYY-MM-DD
const formatDateISO = (date) => date.toISOString().split('T')[0];

// Optional helper you already had
const splitName = (username) => {
  const shortened = username.split('@');
  shortened.length = 1;
  return shortened.toString();
};

// --- Normalisers ---
const isEmpty = (v) => v === null || v === undefined || v === 'empty' || v === '';
// "6b" -> 6, "29" -> 29, "Luteal" -> "Luteal"
const normalise = (val) => {
  if (isEmpty(val)) return null;
  const s = val.toString();
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : s.trim();
};

// ------------------------------
// Default numeric/string writer
// ------------------------------
const updatedb = async (user, severity, impact, selectedA, selectedB) => {
  const currentDate = new Date();
  const docRef = doc(firebaseData, 'users', user.email.concat(formatDateISO(currentDate)));

  // Days should remain full numbers (e.g., 29); normalise also covers "6b" -> 6, hormones -> string
  const A = normalise(selectedA);
  const B = normalise(selectedB);

  const payload = {};
  if (A !== null) payload[severity] = A;
  if (impact && B !== null) payload[impact] = B;

  await setDoc(docRef, payload, { merge: true });
};

// ------------------------------
// Feedback writer (supports BOTH signatures):
// 1) Legacy: updatedbFeedback(user, otherSymptomsName, feedbackTextName, isOtherSymptoms, feedbackText)
// 2) New:    updatedbFeedback(user, symptomName, value, extraData)
// ------------------------------
const updatedbFeedback = async (...args) => {
  const currentDate = new Date();
  const [user] = args;
  const docRef = doc(firebaseData, 'users', user.email.concat(formatDateISO(currentDate)));

  let payload = {};

  if (args.length >= 5 && typeof args[3] !== 'object') {
    // Legacy signature
    const [, otherSymptomsName, feedbackTextName, isOtherSymptoms, feedbackText] = args;
    const yn = normalise(isOtherSymptoms); // "1"/"0" -> 1/0
    if (yn !== null) payload[otherSymptomsName] = yn;
    if (!isEmpty(feedbackText)) payload[feedbackTextName] = feedbackText.toString();
  } else {
    // New signature
    const [, symptomName, value, extraData = {}] = args;
    const main = normalise(value);
    if (main !== null) payload[symptomName] = main;
    Object.entries(extraData || {}).forEach(([k, v]) => {
      const nv = normalise(v);
      if (nv !== null) payload[k] = nv;
    });
  }

  await setDoc(docRef, payload, { merge: true });
};

// ------------------------------
// String writer (for non-numeric data)
// ------------------------------
const updatedbMisc = async (user, key, value) => {
  const currentDate = new Date();
  const docRef = doc(firebaseData, 'users', user.email.concat(formatDateISO(currentDate)));
  if (isEmpty(key)) return;
  await setDoc(docRef, { [key]: value }, { merge: true });
};

// ------------------------------
// Retrieve stored data
// ------------------------------
const getdb = async (user, desiredDate) => {
  const checkData = await getDoc(doc(firebaseData, 'users', user.email.concat(desiredDate)));
  return checkData.data();
};

export { updatedb, updatedbFeedback, getdb, updatedbMisc, formatDateISO };

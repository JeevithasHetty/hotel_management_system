document.getElementById('staffForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const role = e.target.role.value;
  const contact = e.target.contact.value;

  try {
    const res = await fetch('http://localhost:3000/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, contact })
    });

    const data = await res.json();
    console.log('Staff added:', data);
    alert('Staff added successfully!');
    e.target.reset();
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to add staff.');
  }
});
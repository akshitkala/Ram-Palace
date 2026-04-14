async function testForms() {
  console.log("Starting form tests...");
  
  // Test 1: Home Enquiry Form Payload (Reduced Fields)
  const homePayload = {
    name: "John Home",
    phone: "9876543210", // 10 digits as required
    eventType: "Wedding",
    eventDate: "2026-10-15"
  };

  try {
    console.log("\nTesting Home Enquiry Form Workflow...");
    const res = await fetch("http://localhost:3000/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(homePayload)
    });
    
    const data = await res.json();
    console.log("Home form response status:", res.status);
    console.log("Home form response body:", data);
  } catch (err) {
    console.error("Home form failed:", err.message);
  }

  // Test 2: Contact Form Payload (Full Fields)
  const contactPayload = {
    name: "Jane Contact",
    email: "jane@example.com",
    phone: "9876543211",
    eventType: "Corporate",
    eventDate: "2026-11-20",
    guestCount: "250",
    message: "We are looking for a venue with AV setup."
  };

  try {
    console.log("\nTesting Contact Form Workflow...");
    const res = await fetch("http://localhost:3000/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload)
    });
    
    const data = await res.json();
    console.log("Contact form response status:", res.status);
    console.log("Contact form response body:", data);
  } catch (err) {
    console.error("Contact form failed:", err.message);
  }
}

testForms();

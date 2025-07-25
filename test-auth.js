// Simple test script to verify authentication flow
console.log('Testing authentication flow...');

// Test 1: Check if we can access the debug auth page
fetch('http://localhost:3000/debug-auth')
  .then(response => {
    console.log('Debug auth page status:', response.status);
    return response.text();
  })
  .then(html => {
    console.log('Debug auth page loaded successfully');
  })
  .catch(error => {
    console.error('Error accessing debug auth page:', error);
  });

// Test 2: Check auth status API
fetch('http://localhost:3000/api/auth/status', {
  credentials: 'include'
})
  .then(response => {
    console.log('Auth status API response:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Auth status data:', data);
  })
  .catch(error => {
    console.error('Error checking auth status:', error);
  });

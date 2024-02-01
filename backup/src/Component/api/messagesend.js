const twilio = require("twilio")

const accountSid = 'ACf47e7e8eed3933983cb669fc58644e3f';
const authToken = '817026df29d3d591e3fd1f01ad5988be';
const client = twilio(accountSid, authToken);
//SendMessage
async function sendSMS(to, message) {
    try {
        // Send SMS
        const result = await client.messages.create({
            body: message,
            from: '17083152514',
            to: 8085984844
        });
        console.log(result.sid);
        return true; // Indicate success
    } catch (error) {
        console.error(error);
        return false; // Indicate failure
    }
}

 export { sendSMS }
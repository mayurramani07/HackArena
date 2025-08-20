const axios = require("axios");

async function testClist() {
  try {
    const res = await axios.get(
      "https://clist.by/api/v2/contest/?limit=1",
      {
        headers: {
          Authorization: "ApiKey mayurramani07:eb0a6711510f256f83ddbf601ca02c6731bf639f"
        }
      }
    );
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testClist();

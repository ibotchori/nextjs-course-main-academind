// /api/anew-meetup
// POST /api/anew-meetup

function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // export information from incoming data
    const { title, image, address, description } = data
  }
}

export default handler;

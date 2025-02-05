// frontend/app/api/ai-recommendations/route.js

export async function POST(request) {
    try {
      // Lees de JSON-body uit de request
      const { user_id } = await request.json();
      
      // Controleer of user_id is meegegeven
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'user_id is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Dummy data voor aanbevelingen; vervang dit met je eigen AI-logica later
      const recommendations = [
        { post_id: 101, title: "Aanbevolen Post 1", score: 0.95 },
        { post_id: 102, title: "Aanbevolen Post 2", score: 0.90 },
      ];
  
      // Geef de aanbevelingen terug in de response
      return new Response(JSON.stringify({ data: recommendations }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // Bij een fout, geef een error response terug
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
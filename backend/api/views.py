from django.http import JsonResponse
from .scraper import scrape_ttapp_players, scrape_ttapp_team_details

def competition_data(request):
    try:
        # In a real app, check cache here first!
        # For now, we call the scraper directly
        scraped_players = scrape_ttapp_players("1159")
        scrapped_teams = scrape_ttapp_team_details("1159")
        
        return JsonResponse({
            "source": "live_scraper",
            "club_id": "1159",
            "data": {
                "players": scraped_players,
                "count": len(scraped_players),
                "teams": scrapped_teams,

            }
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re
import json

def scrape_ttapp_team_details(club_id="1159"):
    results = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # STEP 1: Get Team List and Extract Poule IDs from HTML
        page.goto(f"https://ttapp.nl/#/club/{club_id}/t")
        
        # Wait for the specific element that contains the data
        page.wait_for_selector("div.list-group-item.navitem")
        
        soup = BeautifulSoup(page.content(), 'html.parser')
        team_elements = soup.find_all("div", class_="list-group-item navitem")
        
        teams_to_scrape = []
        for team in team_elements:
            # Extract Team Name and Poule Name
            team_name = team.find("span", {"data-bind": "text: teamname"}).get_text(strip=True)
            poule_name = team.find("div", class_="poulename").get_text(strip=True)
            players_raw = team.find("div", class_="players").get_text(strip=True)
            
            # Extract the ID: 
            # In TTapp, clicking the div calls gopoule(). 
            # We can find the ID by looking at the page's state or simply by 
            # simulating a click and checking the URL, but the most efficient way 
            # is to find the data context if we can. 
            # Since 'ko' failed, let's use the URL navigation trick:
            
            # Click the element to trigger the URL change
            selector = f"text='{team_name}'"
            page.click(selector)
            
            # Wait for URL to change to #/poule/XXXXXXX
            page.wait_for_url(re.compile(r".*/poule/\d+.*"))
            current_url = page.url
            poule_id = current_url.split("/")[-1].split("?")[0] # Get '5020965'
            
            teams_to_scrape.append({
                "name": team_name,
                "poule": poule_name,
                "players": [p.strip() for p in players_raw.split(",")],
                "poule_id": poule_id
            })
            
            # Go back to the club page for the next team
            page.goto(f"https://ttapp.nl/#/club/{club_id}/t")
            page.wait_for_selector("div.list-group-item.navitem")

        # STEP 2: Scrape Standings for each ID found
        for team in teams_to_scrape:
            page.goto(f"https://ttapp.nl/#/poule/{poule_id}/s", wait_until="networkidle")
            page.wait_for_selector("#tab-standings tbody tr.navitem")

            soup = BeautifulSoup(page.content(), "html.parser")

            standings = []

            rows = soup.select("#tab-standings tbody tr.navitem")

            for row in rows:
                cells = row.find_all("td")

                team_name = cells[0].get_text(strip=True)
                rating = cells[1].get_text(strip=True) if len(cells) > 1 else None
                rating_trimmed = rating[:-2]
                played = cells[2].get_text(strip=True)
                points = cells[3].get_text(strip=True)

                standings.append({
                    "team": team_name,
                    "rating": rating_trimmed,
                    "played": int(played),
                    "points": int(points),
                })
            
            results.append({
                **team,
                "standings": standings
            })

        browser.close()
    return results

def scrape_ttapp_players(club_id="1159"):
    url = f"https://ttapp.nl/#/club/{club_id}/p"
    
    with sync_playwright() as p:
        # Launch headless browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)

        # Wait for the players table to render (looking for the navitem class)
        page.wait_for_selector("tr.navitem")

        # Get the rendered HTML
        html = page.content()
        browser.close()

    # Parse with BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    players = []

    # Find all rows with class 'navitem' as seen in your image
    rows = soup.find_all("tr", class_="navitem")

    for row in rows:
        # 1. Name and Team (from the first <td>)
        name = row.find("span", {"data-bind": "text: fullname"}).get_text(strip=True)
        team = row.find("div", class_="teamname").get_text(strip=True)

        # 2. Rating (from the second <td>)
        # We look for the div with text-right and rating data-bind
        rating_div = row.find("div", {"data-bind": "text: rating"})
        rating = rating_div.get_text(strip=True) if rating_div else "N/A"

        # 3. Percentage (from the last <td> with class 'pct')
        pct_td = row.find("td", class_="pct")
        percentage = pct_td.get_text(strip=True) if pct_td else "0"

        players.append({
            "name": name,
            "team": team,
            "rating": rating,
            "win_percentage": f"{percentage}%"
        })

    return players
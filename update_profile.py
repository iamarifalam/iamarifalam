#!/usr/bin/env python3
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
from datetime import datetime
import re

# Categories for arXiv search: Artificial Intelligence (cs.AI), Computation and Language (cs.CL), Machine Learning (cs.LG)
ARXIV_URL = "http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=5"
HF_TRENDING_URL = "https://huggingface.co/api/trending?limit=5"

def fetch_arxiv_papers():
    print("Fetching papers from arXiv...")
    try:
        req = urllib.request.Request(ARXIV_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            xml_data = response.read()
        
        root = ET.fromstring(xml_data)
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        
        papers = []
        for entry in root.findall('atom:entry', ns):
            title = entry.find('atom:title', ns).text
            title = re.sub(r'\s+', ' ', title).strip() # Clean newlines and double spaces
            
            published_str = entry.find('atom:published', ns).text
            published_dt = datetime.strptime(published_str[:10], "%Y-%m-%d")
            formatted_date = published_dt.strftime("%b %d, %Y")
            
            url = entry.find('atom:id', ns).text.strip()
            
            authors_elements = entry.findall('atom:author', ns)
            authors = [auth.find('atom:name', ns).text.strip() for auth in authors_elements]
            # Limit to 3 authors to keep formatting clean
            if len(authors) > 3:
                authors_str = ", ".join(authors[:3]) + " et al."
            else:
                authors_str = ", ".join(authors)
                
            papers.append({
                'title': title,
                'date': formatted_date,
                'url': url,
                'authors': authors_str
            })
        return papers
    except Exception as e:
        print(f"Error fetching arXiv papers: {e}")
        return []

def fetch_hf_trending():
    print("Fetching trending models from Hugging Face...")
    try:
        req = urllib.request.Request(HF_TRENDING_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            json_data = json.loads(response.read().decode('utf-8'))
        
        items_list = []
        if isinstance(json_data, dict):
            items_list = json_data.get("recentlyTrending", [])
        elif isinstance(json_data, list):
            items_list = json_data
            
        trending = []
        for item in items_list[:5]:
            repo_id = None
            likes = 0
            repo_type = "model"
            
            if isinstance(item, dict):
                repo_data = item.get("repoData") or item
                repo_id = repo_data.get("id") or repo_data.get("modelId")
                likes = repo_data.get("likes", 0)
                repo_type = item.get("repoType", "model")
            
            if repo_id:
                url = f"https://huggingface.co/{repo_id}" if repo_type == "model" else f"https://huggingface.co/{repo_type}s/{repo_id}"
                display_name = repo_id
                trending.append({
                    'name': display_name,
                    'url': url,
                    'likes': likes,
                    'type': repo_type.capitalize()
                })
        return trending
    except Exception as e:
        print(f"Error fetching Hugging Face trending models: {e}")
        return []

def generate_readme():
    papers = fetch_arxiv_papers()
    trending = fetch_hf_trending()
    
    # 1. Format arXiv papers markdown
    if papers:
        papers_md = ""
        for paper in papers:
            papers_md += f"- **[{paper['title']}]({paper['url']})**  \n"
            papers_md += f"  *Published on {paper['date']} | Authors: {paper['authors']}*  \n\n"
    else:
        papers_md = "_Failed to fetch arXiv papers today. Checking back soon!_\n"
        
    # 2. Format Hugging Face trending markdown
    if trending:
        trending_md = ""
        for item in trending:
            likes_str = f" ({item['likes']} ❤️)" if item['likes'] > 0 else ""
            trending_md += f"- **[{item['name']}]({item['url']})** ({item['type']}){likes_str}  \n"
    else:
        trending_md = "_Failed to fetch Hugging Face trending items today. Checking back soon!_\n"
        
    # 3. Read template and render
    try:
        with open("README_template.md", "r", encoding="utf-8") as f:
            template = f.read()
            
        last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
        
        rendered = template.replace("{{LATEST_ARXIV_PAPERS}}", papers_md.strip())
        rendered = rendered.replace("{{TRENDING_HF_MODELS}}", trending_md.strip())
        rendered = rendered.replace("{{LAST_UPDATED}}", last_updated)
        
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(rendered)
            
        print("README.md successfully updated!")
    except FileNotFoundError:
        print("Error: README_template.md not found. Make sure to run in the correct directory.")
    except Exception as e:
        print(f"Error generating README.md: {e}")

if __name__ == "__main__":
    generate_readme()

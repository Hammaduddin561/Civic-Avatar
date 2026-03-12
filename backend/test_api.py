import requests
import json
import time

BASE_URL = "http://localhost:8000"

def run_tests():
    print("=== CIVIC AVATAR API VERIFICATION SCRIPT ===\n")
    
    # 1. Test Townhall (Live Q&A)
    print("Testing Townhall Mode API...")
    res = requests.post(f"{BASE_URL}/api/chat/townhall", json={"query": "What is the status of the road repair?", "language": "auto"})
    if res.status_code == 200:
        data = res.json()
        print(f"[OK] Success! Received AI Response: {data['response_text'][:50]}... citing {data['source_citation']}")
    else:
        print(f"[FAIL] Failed: {res.text}")
        
    print("-" * 50)
    
    # 2. Test Service (Grievance Filing)
    print("Testing Service Mode API (Filing Grievance)...")
    res = requests.post(f"{BASE_URL}/api/service/grievance", json={"citizen_id": "C-1122", "description": "High urgency emergency water leak at Main St!"})
    if res.status_code == 200:
        g = res.json()
        print(f"[OK] Success! Filed Grievance {g['id']} with status {g['status']}. Since it had 'emergency', severity should be high.")
    else:
        print(f"[FAIL] Failed: {res.text}")
        
    print("-" * 50)
        
    # 3. Test Service (List Grievances)
    print("Testing Service Mode API (Retrieving Grievances)...")
    res = requests.get(f"{BASE_URL}/api/service/grievances")
    if res.status_code == 200:
        data = res.json()
        print(f"[OK] Success! Found {len(data)} grievances in the database.")
    else:
        print(f"[FAIL] Failed: {res.text}")
        
    print("-" * 50)
    
    # 4. Test Outreach (List Campaigns)
    print("Testing Outreach Mode API (List Campaigns)...")
    res = requests.get(f"{BASE_URL}/api/outreach/campaigns")
    if res.status_code == 200:
        campaigns = res.json()
        print(f"[OK] Success! Found {len(campaigns)} active campaigns.")
        c_id = campaigns[0]['id']
        calls = campaigns[0]['calls_made']
    else:
        print(f"[FAIL] Failed: {res.text}")
        c_id = None
        
    print("-" * 50)
        
    # 5. Test Outreach (Trigger Campaign)
    if c_id is not None:
        print(f"Testing Outreach Mode API (Triggering Calls for Campaign {c_id})...")
        res = requests.post(f"{BASE_URL}/api/outreach/campaign/{c_id}/trigger")
        if res.status_code == 200:
            c = res.json()
            print(f"[OK] Success! Calls jumped from {calls} to {c['calls_made']}.")
        else:
            print(f"[FAIL] Failed: {res.text}")
            
    print("-" * 50)
            
    # 6. Test Operations Center (Escalation Queue)
    print("Testing Command Center API (Escalation Queue)...")
    res = requests.get(f"{BASE_URL}/api/queue/escalation")
    if res.status_code == 200:
        data = res.json()
        print(f"[OK] Success! Found {len(data)} tickets in human escalation queue needing intercept.")
    else:
        print(f"[FAIL] Failed: {res.text}")
        
    print("-" * 50)
        
    # 7. Test Operations Center (Provenance Logs)
    print("Testing Command Center API (Provenance Logs)...")
    res = requests.get(f"{BASE_URL}/api/logs/provenance")
    if res.status_code == 200:
        data = res.json()
        print(f"[OK] Success! Fetched {len(data)} cryptographic provenance logs.")
        print(f"Most recent log: [{data[0]['status']}] {data[0]['title']}")
    else:
        print(f"[FAIL] Failed: {res.text}")
        
    print("\n=== ALL TESTS COMPLETED ===")

if __name__ == "__main__":
    run_tests()

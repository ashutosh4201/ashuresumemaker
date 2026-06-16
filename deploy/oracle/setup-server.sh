#!/bin/bash
# One-time Oracle Cloud Ubuntu VM setup — run as ubuntu user with sudo
set -e

echo "==> Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "==> Installing Docker..."
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker "$USER"

echo "==> Installing Nginx + Certbot..."
sudo apt-get install -y nginx certbot python3-certbot-nginx

echo "==> Opening ports in iptables (Oracle images sometimes block 80/443)..."
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT 2>/dev/null || true
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT 2>/dev/null || true
if command -v netfilter-persistent >/dev/null 2>&1; then
  sudo netfilter-persistent save
fi

echo ""
echo "Done! Log out and SSH back in (docker group), then deploy the app."
echo "Next: git clone your repo, copy deploy/oracle/.env.example to .env, fill values,"
echo "      docker compose -f docker-compose.oracle.yml up -d --build"

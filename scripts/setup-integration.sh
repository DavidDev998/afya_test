#!/bin/bash

# 🚀 GitHub & Vercel Integration Setup Script
# This script helps automate the integration process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required tools are installed
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm installed: $NPM_VERSION"
    else
        print_error "npm is not installed."
        exit 1
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        print_success "Git is installed"
    else
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    print_success "All prerequisites met!"
}

# Install dependencies if needed
install_dependencies() {
    print_header "Installing Dependencies"
    
    if [ ! -d "node_modules" ]; then
        print_info "Installing npm dependencies..."
        npm install
        print_success "Dependencies installed"
    else
        print_info "Dependencies already installed"
    fi
}

# Initialize git repository
setup_git() {
    print_header "Setting up Git Repository"
    
    if [ ! -d ".git" ]; then
        print_info "Initializing git repository..."
        git init
        print_success "Git repository initialized"
    else
        print_info "Git repository already exists"
    fi
    
    # Check if there are any commits
    if ! git log --oneline -1 &> /dev/null; then
        print_info "Creating initial commit..."
        git add .
        git commit -m "feat: initial project setup with CI/CD pipeline"
        print_success "Initial commit created"
    else
        print_info "Repository already has commits"
    fi
}

# Get user input for GitHub setup
get_github_info() {
    print_header "GitHub Repository Setup"
    
    echo -e "Please provide your GitHub information:\n"
    
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -p "Enter repository name (default: afya_test): " REPO_NAME
    REPO_NAME=${REPO_NAME:-afya_test}
    
    GITHUB_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    
    echo -e "\n${BLUE}Repository will be created at: $GITHUB_URL${NC}"
    read -p "Is this correct? (y/n): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Setup cancelled. Please run the script again."
        exit 1
    fi
}

# Setup GitHub remote
setup_github_remote() {
    print_header "Configuring GitHub Remote"
    
    # Check if remote already exists
    if git remote get-url origin &> /dev/null; then
        CURRENT_REMOTE=$(git remote get-url origin)
        print_warning "Remote origin already exists: $CURRENT_REMOTE"
        read -p "Do you want to update it? (y/n): " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git remote set-url origin $GITHUB_URL
            print_success "Remote origin updated"
        fi
    else
        git remote add origin $GITHUB_URL
        print_success "Remote origin added"
    fi
    
    # Set main branch
    git branch -M main
    print_success "Main branch configured"
}

# Setup Vercel CLI
setup_vercel_cli() {
    print_header "Setting up Vercel CLI"
    
    if ! command -v vercel &> /dev/null; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI installed"
    else
        print_success "Vercel CLI already installed"
    fi
    
    print_info "Please login to Vercel and link your project"
    print_warning "Run these commands manually:"
    echo -e "${YELLOW}"
    echo "  vercel login"
    echo "  vercel link"
    echo -e "${NC}"
    
    read -p "Press Enter after completing Vercel setup..."
}

# Generate setup instructions
generate_instructions() {
    print_header "Next Steps"
    
    echo -e "${BLUE}📋 Complete these steps to finish the integration:${NC}\n"
    
    echo "1. Create GitHub Repository:"
    echo "   - Go to https://github.com/new"
    echo "   - Repository name: $REPO_NAME"
    echo "   - Description: Cryptocurrency Dashboard - Afya Technical Test"
    echo "   - Click 'Create repository'"
    echo ""
    
    echo "2. Push your code to GitHub:"
    echo "   git push -u origin main"
    echo ""
    
    echo "3. Setup Vercel:"
    echo "   - Go to https://vercel.com"
    echo "   - Import your GitHub repository"
    echo "   - Deploy the project"
    echo ""
    
    echo "4. Get Vercel tokens:"
    echo "   - Vercel Dashboard > Settings > Tokens"
    echo "   - Create new token with full account access"
    echo "   - Run: cat .vercel/project.json (after vercel link)"
    echo ""
    
    echo "5. Configure GitHub Secrets:"
    echo "   - Repository Settings > Secrets and variables > Actions"
    echo "   - Add: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID"
    echo ""
    
    echo "6. Test the pipeline:"
    echo "   - Create a test branch and PR"
    echo "   - Verify CI/CD workflows run successfully"
    echo ""
    
    echo -e "${GREEN}📚 For detailed instructions, see: docs/INTEGRATION_GUIDE.md${NC}"
}

# Validate setup
validate_setup() {
    print_header "Validating Setup"
    
    # Check if all required files exist
    local required_files=(
        ".github/workflows/ci.yml"
        ".github/workflows/cd.yml"
        ".github/workflows/preview.yml"
        "lighthouserc.json"
        "docs/CI_CD_SETUP.md"
        "docs/INTEGRATION_GUIDE.md"
    )
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file exists"
        else
            print_error "$file is missing"
        fi
    done
    
    # Test npm scripts
    print_info "Testing npm scripts..."
    if npm run lint &> /dev/null; then
        print_success "Linting works"
    else
        print_warning "Linting has issues"
    fi
    
    if npm run type-check &> /dev/null; then
        print_success "Type checking works"
    else
        print_warning "Type checking has issues"
    fi
    
    if npm run test &> /dev/null; then
        print_success "Tests work"
    else
        print_warning "Tests have issues"
    fi
}

# Main execution
main() {
    echo -e "${GREEN}"
    echo "🚀 GitHub & Vercel Integration Setup"
    echo "===================================="
    echo -e "${NC}"
    
    check_prerequisites
    install_dependencies
    setup_git
    get_github_info
    setup_github_remote
    validate_setup
    setup_vercel_cli
    generate_instructions
    
    print_header "Setup Complete!"
    print_success "Your project is ready for GitHub and Vercel integration!"
    print_info "Follow the instructions above to complete the process."
    
    echo -e "\n${BLUE}🔗 Useful links:${NC}"
    echo "- Integration Guide: docs/INTEGRATION_GUIDE.md"
    echo "- CI/CD Documentation: docs/CI_CD_SETUP.md"
    echo "- GitHub: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "- Vercel: https://vercel.com"
}

# Run the main function
main "$@" 
// Navigation loader utility
function loadNavigation() {
    console.log('Loading navigation...');
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const componentsPath = isInPagesFolder ? '../components/' : './components/';
    
    console.log('Current path:', currentPath);
    console.log('Components path:', componentsPath);
    
    fetch(componentsPath + 'nav.html')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Navigation HTML loaded successfully');
            // Extract the nav element and styles from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            
            // Extract and inject styles
            const styles = doc.querySelector('style');
            if (styles && !document.querySelector('style[data-nav-styles]')) {
                styles.setAttribute('data-nav-styles', 'true');
                document.head.appendChild(styles);
                console.log('Navigation styles injected');
            }
            
            // Extract and inject navigation
            const nav = doc.querySelector('nav');
            if (nav) {
                const navContainer = document.getElementById('navigation-container');
                if (navContainer) {
                    navContainer.innerHTML = nav.outerHTML;
                    console.log('Navigation HTML injected');
                    
                    // Re-initialize Bootstrap components after injecting HTML
                    setTimeout(() => {
                        if (typeof window.bootstrap !== 'undefined') {
                            // Initialize navbar collapse functionality
                            const navbarToggler = document.querySelector('.navbar-toggler');
                            const navbarCollapse = document.querySelector('.navbar-collapse');
                            if (navbarToggler && navbarCollapse) {
                                console.log('Initializing Bootstrap collapse');
                                new window.bootstrap.Collapse(navbarCollapse, {
                                    toggle: false
                                });
                            }
                        }
                    }, 100);
                } else {
                    console.error('Navigation container not found');
                }
            } else {
                console.error('Nav element not found in loaded HTML');
            }
            
            // Extract and execute scripts
            const scripts = doc.querySelectorAll('script');
            console.log('Found', scripts.length, 'scripts to execute');
            scripts.forEach((script, index) => {
                setTimeout(() => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                    console.log('Script', index + 1, 'executed');
                }, 50 * (index + 1));
            });
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            // Fallback: create a basic navigation structure if loading fails
            createFallbackNavigation();
        });
}

// Fallback navigation in case the component fails to load
function createFallbackNavigation() {
    console.log('Creating fallback navigation');
    const navContainer = document.getElementById('navigation-container');
    if (!navContainer) {
        console.error('Navigation container not found for fallback');
        return;
    }
    
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : './';
    const pagesPath = isInPagesFolder ? './' : './pages/';
    
    const fallbackNav = `
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="${basePath}index.html">VARUN K S</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="${basePath}index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="${basePath}index.html#about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="${basePath}index.html#experience">Experience</a></li>
                        <li class="nav-item"><a class="nav-link" href="${basePath}index.html#skills">Skills</a></li>
                        <li class="nav-item"><a class="nav-link" href="${basePath}index.html#education">Education</a></li>
                        <li class="nav-item"><a class="nav-link" href="${pagesPath}projects.html">Projects</a></li>
                        <li class="nav-item"><a class="nav-link" href="${pagesPath}resume.html">Resume</a></li>
                        <li class="nav-item"><a class="nav-link" href="${pagesPath}contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    navContainer.innerHTML = fallbackNav;
    console.log('Fallback navigation created');
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting navigation load');
    // Add a small delay to ensure Bootstrap is loaded
    setTimeout(loadNavigation, 100);
});

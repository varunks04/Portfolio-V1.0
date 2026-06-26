// Navigation injection (file:// protocol compatible)
function createNavigation() {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : './';
    const pagesPath = isInPagesFolder ? './' : './pages/';

    let activePage = 'home';
    if (currentPath.includes('projects.html')) activePage = 'projects';
    else if (currentPath.includes('resume.html')) activePage = 'resume';
    else if (currentPath.includes('contact.html')) activePage = 'contact';

    const navHTML = `
        <nav class="navbar navbar-expand-lg fixed-top" aria-label="Main navigation">
            <div class="container">
                <a class="navbar-brand" href="${basePath}index.html#about">VARUN K S</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="${basePath}index.html#about">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#about">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#experience">Experience</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#skills">Skills</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#education">Education</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'projects' ? 'active' : ''}" href="${pagesPath}projects.html">Projects</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'resume' ? 'active' : ''}" href="${pagesPath}resume.html">Resume</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'contact' ? 'active' : ''}" href="${pagesPath}contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        navContainer.innerHTML = navHTML;

        setTimeout(() => {
            if (typeof window.bootstrap !== 'undefined' && window.bootstrap.Collapse) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse) {
                    new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
                }
            }
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(createNavigation, 100);
});

// Content Loading Functions
async function loadMarkdownContent(file, elementId, parser = null) {
    try {
        const response = await fetch(file);
        const markdown = await response.text();
        const html = marked.parse(markdown);
        
        if (parser) {
            parser(html, elementId);
        } else {
            document.getElementById(elementId).innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

function parseProjects(html, elementId) {
    const container = document.getElementById(elementId);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove the main heading
    tempDiv.querySelector('h1')?.remove();
    
    const projects = [];
    const h2Elements = tempDiv.querySelectorAll('h2');
    
    h2Elements.forEach(h2 => {
        const projectDiv = document.createElement('div');
        projectDiv.appendChild(h2);
        
        let nextElement = h2.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'HR') {
            projectDiv.appendChild(nextElement.cloneNode(true));
            nextElement = nextElement.nextElementSibling;
        }
        
        projects.push(projectDiv.innerHTML);
    });
    
    let projectsHtml = '';
    projects.forEach(project => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = project;
        
        const title = tempDiv.querySelector('h2')?.textContent || 'Untitled Project';
        const description = tempDiv.querySelector('p:not(:has(strong))')?.textContent || '';
        
        // Extract tags and github link
        let tags = [];
        let githubLink = '#';
        
        const strongElements = tempDiv.querySelectorAll('strong');
        strongElements.forEach(strong => {
            const text = strong.parentElement.textContent;
            if (text.includes('Tags:')) {
                tags = text.replace('Tags:', '').trim().split(',').map(t => t.trim());
            } else if (text.includes('GitHub:')) {
                githubLink = text.replace('GitHub:', '').trim();
            }
        });
        
        projectsHtml += `
            <div class="project-card">
                <div class="project-header">
                    <h3>${title}</h3>
                    <div class="project-links">
                        <a href="${githubLink}" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <p class="project-description">${description}</p>
                <div class="project-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = projectsHtml;
}

function parsePublications(html, elementId) {
    const container = document.getElementById(elementId);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove the main heading
    tempDiv.querySelector('h1')?.remove();
    
    const publications = [];
    const h2Elements = tempDiv.querySelectorAll('h2');
    
    h2Elements.forEach(h2 => {
        const pubDiv = document.createElement('div');
        pubDiv.appendChild(h2);
        
        let nextElement = h2.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'HR') {
            pubDiv.appendChild(nextElement.cloneNode(true));
            nextElement = nextElement.nextElementSibling;
        }
        
        publications.push(pubDiv.innerHTML);
    });
    
    let pubsHtml = '';
    publications.forEach(pub => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = pub;
        
        const title = tempDiv.querySelector('h2')?.textContent || 'Untitled';
        const paragraphs = tempDiv.querySelectorAll('p');
        
        let authors = '';
        let journal = '';
        let description = '';
        
        paragraphs.forEach(p => {
            const text = p.textContent;
            if (text.includes('Authors:')) {
                authors = p.innerHTML.replace(/\*\*Authors:\*\*/g, '').trim();
            } else if (text.includes('Journal:') || text.includes('Conference:') || text.includes('Repository:')) {
                journal = p.innerHTML.replace(/\*\*(Journal|Conference|Repository):\*\*/g, '').trim();
            } else {
                description = p.textContent;
            }
        });
        
        pubsHtml += `
            <div class="publication-item">
                <h4>${title}</h4>
                ${authors ? `<p class="publication-authors">${authors}</p>` : ''}
                ${journal ? `<p class="publication-journal">${journal}</p>` : ''}
                ${description ? `<p>${description}</p>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = pubsHtml;
}

function parseBlog(html, elementId) {
    const container = document.getElementById(elementId);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove the main heading
    tempDiv.querySelector('h1')?.remove();
    
    const posts = [];
    const h2Elements = tempDiv.querySelectorAll('h2');
    
    h2Elements.forEach(h2 => {
        const postDiv = document.createElement('div');
        postDiv.appendChild(h2);
        
        let nextElement = h2.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'HR') {
            postDiv.appendChild(nextElement.cloneNode(true));
            nextElement = nextElement.nextElementSibling;
        }
        
        posts.push(postDiv.innerHTML);
    });
    
    let blogHtml = '';
    posts.forEach(post => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post;
        
        blogHtml += `
            <div class="blog-post">
                ${tempDiv.innerHTML}
            </div>
        `;
    });
    
    container.innerHTML = blogHtml;
}

// Initialize content loading
async function initContent() {
    await loadMarkdownContent('about.md', 'about-content');
    await loadMarkdownContent('projects.md', 'projects-content', parseProjects);
    await loadMarkdownContent('publications.md', 'publications-content', parsePublications);
    await loadMarkdownContent('cv.md', 'cv-content');
    await loadMarkdownContent('blog.md', 'blog-content', parseBlog);
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', initContent);

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize hero section to be visible immediately
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

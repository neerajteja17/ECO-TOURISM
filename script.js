// Global state
let currentPage = 'cover-page';
let visitedPages = [];

// Page navigation
function navigateToPage(pageId) {
    const currentPageElement = document.getElementById(currentPage);
    const nextPageElement = document.getElementById(pageId);
    
    if (!nextPageElement) return;
    
    // Add current page to visited pages
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
    }
    
    // Fade out current page
    currentPageElement.style.opacity = '0';
    currentPageElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        // Hide current page
        currentPageElement.classList.remove('active');
        
        // Show next page
        nextPageElement.classList.add('active');
        currentPage = pageId;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Animate in next page
        setTimeout(() => {
            nextPageElement.style.opacity = '1';
            nextPageElement.style.transform = 'translateY(0)';
        }, 50);
        
        // Add page-specific initialization
        initializePage(pageId);
        
    }, 300);
}

// Initialize page-specific functionality
function initializePage(pageId) {
    switch (pageId) {
        case 'cover-page':
            initializeCoverPage();
            break;
        case 'question-page':
            initializeQuestionPage();
            break;
        case 'climate-page':
        case 'halfearth-page':
        case 'regenerative-page':
        case 'agro-page':
            initializeTopicPage(pageId);
            break;
        case 'summary-page':
            initializeSummaryPage();
            break;
    }
}

// Cover page initialization
function initializeCoverPage() {
    // Add parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-background img');
        if (parallaxElement) {
            parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Auto-advance after 10 seconds (optional)
    // setTimeout(() => {
    //     if (currentPage === 'cover-page') {
    //         navigateToPage('question-page');
    //     }
    // }, 10000);
}

// Question page initialization
function initializeQuestionPage() {
    // Add staggered animation to option cards
    const cards = document.querySelectorAll('.option-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// Topic page initialization
function initializeTopicPage(pageId) {
    // Reset all Q&A sections
    const answerContents = document.querySelectorAll('.answer-content');
    answerContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.classList.remove('active');
    });
    
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Animate action points
    const pointCards = document.querySelectorAll('.point-card');
    pointCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
}

// Summary page initialization
function initializeSummaryPage() {
    // Animate summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, 200 * (index + 1));
    });
    
    // Animate CTA section
    setTimeout(() => {
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.style.opacity = '0';
            ctaSection.style.transform = 'translateY(30px)';
            ctaSection.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                ctaSection.style.opacity = '1';
                ctaSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }, 800);
}

// Q&A functionality
function showAnswer(questionId, answerType) {
    const answerContent = document.getElementById(questionId);
    const answers = answerContent.querySelectorAll('.answer');
    const buttons = answerContent.parentNode.querySelectorAll('.answer-btn');
    
    // Remove active class from all buttons in this question
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Hide all answers
    answers.forEach(answer => answer.classList.remove('active'));
    
    // Show answer content container
    answerContent.classList.add('active');
    
    // Show specific answer
    const targetAnswer = answerContent.querySelector(`.answer.${answerType}`);
    if (targetAnswer) {
        targetAnswer.classList.add('active');
    }
}

// Modal functionality
function showResources() {
    const modal = document.getElementById('resources-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('resources-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Share functionality
function sharePortal() {
    if (navigator.share) {
        navigator.share({
            title: 'Eco-Tourism Future Portal',
            text: 'Discover how travel can help restore our planet through eco-tourism!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers without Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            // Final fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copied to clipboard!');
        });
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--color-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('resources-modal').classList.contains('active')) {
        closeModal();
    }
});

// Click outside modal to close
document.getElementById('resources-modal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set initial page
    const coverPage = document.getElementById('cover-page');
    if (coverPage) {
        coverPage.classList.add('active');
        initializePage('cover-page');
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Preload images
function preloadImages() {
    const imageUrls = [
        'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
        'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&dpr=2',
        'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&dpr=2',
        'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&dpr=2',
        'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&dpr=2'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);

// Add scroll-based animations
function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.point-card, .summary-card, .question-block').forEach(el => {
        observer.observe(el);
    });
}

// Add the animation CSS
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .point-card, .summary-card, .question-block {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .point-card.animate-in, .summary-card.animate-in, .question-block.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyle);

// Initialize scroll animations after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(handleScrollAnimations, 1000);
});
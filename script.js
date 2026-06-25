/*
  Dynamic project gallery

*/

const projects = [
  {
    title: "Low-Cost IoT Environmental Monitoring & Early-Warning System for Rural Resilience",
    category: "Research",
    summary: "Master’s thesis prototype for rural environmental monitoring, fire alerts, GPS/location data, and cloud/mobile visualization.",
    tools: ["IoT", "Sensors", "GSM/GPRS", "ThingSpeak", "Early Warning"],
    image: "assets/projects/iot-early-warning.svg",
    link: "https://drive.google.com/file/d/1dmvOGBUbqlTxxe37HXkAqYar-Lz5FBPI/view",
    linkType: "Case Study",
    confidential: false
  },
  {
    title: "Cold Call Data Modeling and Mining",
    category: "Dashboard",
    summary: "Power BI dashboard and data analysis project focused on cold-call performance, conversion patterns, and campaign decision support.",
    tools: ["Power BI", "Data Modeling", "Excel", "Dashboard", "Analysis"],
    image: "assets/projects/cold-call-dashboard.svg",
    link: "https://github.com/ibtissemhani/Car-Insurance-Cold-Call-Data-Analysis/blob/main/Car%20Insurance%20PowerBi%20Dashboard.pdf",
    linkType: "Power BI ",
    confidential: false
  },
  {
    title: "Customer Data Analysis for Sprocket Central Pty Ltd",
    category: "Data Science",
    summary: "Customer data analysis and modeling work focused on understanding patterns and supporting marketing-oriented recommendations.",
    tools: ["Python", "pandas", "Modeling", "Data Mining", "Kaggle"],
    image: "assets/projects/sprocket-customer-analysis.svg",
    link: "https://www.kaggle.com/code/hanihani/modeling-and-data-mining-of-cold-call-data",
    linkType: "Kaggle Notebook",
    confidential: false
  },
  {
    title: "Arabic-English Humanitarian Document Intelligence",
    category: "Data Science",
    summary: "A synthetic-data workflow for cleaning, extracting, and analyzing bilingual humanitarian-style structured and unstructured records.",
    tools: ["Python", "pandas", "SQL", "Entity Extraction", "Data Quality"],
    image: "assets/projects/humanitarian-doc-intelligence.svg",
    link: "https://www.kaggle.com/code/hanihani/arabic-english-humanitarian-document-intelligence",
    linkType: "Kaggle Notebook",
    confidential: false
  },
  {
    title: "Red Bull Off-Premise Sales Job Simulation on Forage",
    category: "Business Analytics",
    summary: "Sales data analysis and recommendation presentation for key account growth during a Forage job simulation.",
    tools: ["Excel", "Sales Analysis", "Presentation", "Recommendations"],
    image: "assets/projects/redbull-simulation.svg",
    link: "https://www.canva.com/design/DAGgwvYB_QA/APs7QMfs8XMcC24A2MWY9w/watch?utm_content=DAGgwvYB_QA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7e652e91e4",
    linkType: "Presentation",
    confidential: false
  },
  {
    title: "Exploring Mental Health Data",
    category: "Data Science",
    summary: "Exploratory analysis and predictive modeling project to classify depression likelihood using a Kaggle Playground Series dataset.",
    tools: ["Python", "pandas", "Machine Learning", "EDA", "Kaggle"],
    image: "assets/projects/mental-health-kaggle.svg",
    link: "https://www.kaggle.com/code/hanihani/exploring-mental-health-data",
    linkType: "Kaggle Notebook",
    confidential: false
  },
  {
    title: "Nobel Prize Winners Dataset Analysis",
    category: "Research",
    summary: "Exploratory data analysis of Nobel Prize winners to identify patterns across time, categories, geography, and demographics.",
    tools: ["Python", "pandas", "EDA", "Visualization"],
    image: "assets/projects/nobel-eda.svg",
    link: "https://www.kaggle.com/code/hanihani/nobel-prize-2023-1901",
    linkType: "Kaggle Notebook",
    confidential: false
  }
];

const projectsGrid = document.querySelector("#projectsGrid");
const filterButtons = document.querySelectorAll(".filter-chip");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const year = document.querySelector("#year");

function externalAttrs(link) {
  return link && link.startsWith("http") ? 'target="_blank" rel="noopener"' : "";
}

function renderProjects(filter = "all") {
  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = filteredProjects.map((project, index) => {
    const tools = project.tools.map((tool) => `<span>${tool}</span>`).join("");
    const safeLink = project.link || "#contact";

    return `
      <article class="project-card reveal is-visible" style="transition-delay:${index * 40}ms">
        <img class="project-cover" src="${project.image}" alt="Cover image for ${project.title}" loading="lazy" />
        <div class="project-body">
          <div class="project-meta">
            <span class="project-category">${project.category}</span>
            <span class="project-link-type">${project.linkType}</span>
          </div>
          <a class="project-title" href="${safeLink}" ${externalAttrs(safeLink)}>${project.title}</a>
          <p class="project-summary">${project.summary}</p>
          <div class="tools" aria-label="Tools used">${tools}</div>
          <div class="project-actions">
            <a class="project-btn" href="${safeLink}" ${externalAttrs(safeLink)}>View Project</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

year.textContent = new Date().getFullYear();
renderProjects();

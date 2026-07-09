import { Mail, MapPin, Download, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const skillGroups = [
  { label: 'Programming', skills: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'Dart'] },
  { label: 'Data & AI', skills: ['PyTorch', 'NumPy', 'Pandas', 'Matplotlib', 'Power BI', 'Feature Engineering'] },
  { label: 'Full-Stack', skills: ['FastAPI', 'React', 'Node.js', 'Next.js', 'Flutter', 'MongoDB', 'PostgreSQL', 'Firebase'] },
  { label: 'Robotics & Design', skills: ['ESP32', 'Arduino', 'Raspberry Pi', 'LQR/PID', 'IK', 'OnShape', '3D Printing'] },
  { label: 'Specializations', skills: ['Computer Vision', 'Object Detection', 'Knowledge Distillation', 'IoT Architecture'] },
  { label: 'Tools', skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Linux', 'VS Code', 'MS Excel'] },
  { label: 'Soft Skills', skills: ['Team Leadership', 'Communication', 'Conflict Resolution'] },
]

const education = [
  {
    degree: 'BSc in Computer Science and Engineering',
    school: 'North South University',
    period: '06/2021 – 09/2025',
    location: 'Dhaka, Bangladesh',
    grade: 'CGPA: 3.01',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'Shaheed Police Smriti College',
    period: '2019',
    location: 'Dhaka, Bangladesh',
    grade: 'GPA: 4.75',
  },
  {
    degree: 'Secondary School Certificate',
    school: 'Shaheed Police Smriti College',
    period: '2017',
    location: 'Dhaka, Bangladesh',
    grade: 'GPA: 5.00',
  },
]

const projects = [
  {
    title: 'NSU Career and Placement Center Website',
    year: '2023',
    bullets: [
      'Replaced the legacy PHP/HTML university job portal with a modern MERN stack, significantly improving UI/UX and streamlining the job placement workflow.',
      'Integrated Google Authentication for secure single-sign-on login and built an automatic CV generator that populates from student profile data.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'ACROBOT – Robots With Inverted Pendulums',
    year: '2025',
    bullets: [
      'Designed and fabricated a hybrid hexapod walking robot and a cube robot with an inverted-pendulum active balancing system that balances on its edges.',
      'Implemented LQR controller in MATLAB, Madgwick filter for IMU fusion, and Inverse Kinematics for gait planning; simulated in PyBullet before hardware deployment.',
    ],
    stack: ['MATLAB', 'ESP32', 'Arduino Uno', 'MPU6050', 'LQR/PID', 'PyBullet', 'OnShape', '3D Printing'],
  },
  {
    title: 'Scout – Volleyball Players Portfolio Platform And Live Referee App',
    year: '2026',
    callout: "(you're using it right now)",
    bullets: [
      'Built a full-stack platform for the Bangladeshi volleyball community where players sign in, create stat portfolios, and get discovered by teams and coaches.',
      'Developed a companion VB Referee app for conducting live matches and tracking scores in real time.',
    ],
    stack: ['FastAPI', 'Next.js', 'MongoDB', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'Knowledge Distillation on YOLO with KAN',
    year: '2024',
    bullets: [
      'Implemented and analyzed YOLO8x, YOLO5x, YOLO8n, and YOLO5n with Kolmogorov-Arnold Networks using knowledge distillation across COCO, Crack-seg, Braintumor, and African-wildlife datasets.',
      'Produced smaller, more efficient student models without sacrificing detection accuracy – validating KAN as a promising distillation target architecture.',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'Kolmogorov-Arnold Networks'],
  },
  {
    title: 'SENTINEL – A Home Security System',
    year: '2025',
    bullets: [
      'Built a multi-sensor smart home security system covering sonar, IR, temperature, humidity, smoke, gas leak detection, and a password-protected door lock.',
      'Developed the companion Flutter app "SENTINEL" with a Firebase backend for real-time sensor dashboards, push-based intruder alerts, remote monitoring, and Bluetooth voice control for fan/light automation.',
    ],
    stack: ['Flutter', 'Dart', 'Python', 'Raspberry Pi Pico W', 'Firebase'],
  },
  {
    title: 'Plant Disease Detection and Quality Classification',
    year: '2024',
    bullets: [
      'Built a custom CNN classifying 38 plant-disease classes from 128×128 leaf images, demonstrating end-to-end deep learning model design for agricultural applications.',
      'Trained and evaluated model performance across multiple class-imbalanced categories using cuDNN-accelerated training.',
    ],
    stack: ['Python', 'PyTorch', 'cuDNN', 'Kaggle Plant Disease Dataset'],
  },
]

const extracurricular = [
  {
    title: 'Captain – NSU Volleyball Team',
    body: 'Started from school and continued this passion till university. Participated in various tournaments on behalf of NSU. Had the honor to lead as the captain of the NSU volleyball team.',
  },
  {
    title: 'NSU Games & Sports Club',
    body: 'Organized events, friendly matches and tournaments, conducted sports tryouts for volleyball, and managed operations.',
  },
  {
    title: 'NSU Intelligence & Robotics Labs (NIRO)',
    body: 'Was very active in NIRO Labs since its birth in 2025. Experimented with 3D printing, hands-on programming on microcontrollers, and conducted workshops on robotics and embedded systems programming. Participated in the first-ever BEAR Summit / National Semiconductor Symposium, Bangladesh – showcasing robotics projects in a national exhibition, demonstrating the innovation and technical expertise of NIRO Labs.',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">
      {children}
    </p>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
        {/* Hero */}
        <section className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src="/shahriar-ratul.jpg"
            alt="Shahriar Ratul"
            className="w-40 h-40 rounded-full object-cover border border-border/50 flex-shrink-0"
          />
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Shahriar Ratul</h1>
              <p className="text-primary font-semibold mt-1">Software Engineer</p>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Passionate about leveraging technology and data-driven insights to improve
              processes and solve real-world problems across technology and business
              strategy. I am skilled at collaborating with diverse team and bridging the
              gap between technical insights and business outcomes.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a href="mailto:shahriarratul100@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail size={16} />
                shahriarratul100@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={16} />
                Dhaka, Bangladesh
              </span>
              {/* TODO: add real LinkedIn profile URL */}
              <a href="#" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              {/* TODO: add real GitHub profile URL */}
              <a href="#" className="hover:text-foreground transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
            <Button asChild>
              <a href="/Shahriar_Ratul_cv.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionLabel>Skills</SectionLabel>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <p className="text-sm font-semibold w-40 flex-shrink-0">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionLabel>Experience</SectionLabel>
          <div className="rounded-xl bg-secondary/40 border border-border/50 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <p className="font-semibold">Intern – AI Engineer</p>
                <p className="text-sm text-primary">Cloudly Infotech</p>
              </div>
              <p className="text-sm text-muted-foreground">02/2026 – Present · Dhaka, Bangladesh</p>
            </div>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground">
              <li>
                Currently contributing on CloudlyIO&apos;s RADP (RAN Intelligent Controller Algorithm
                Development Platform) project &quot;NetAI&quot;. NetAI is a multi-tenant SaaS platform that
                leverages Bayesian Digital Twins and multi-agent Reinforcement Learning to autonomously
                optimize cellular networks for energy efficiency, coverage, and throughput.
              </li>
              <li>
                Research and academic paper writing titled &quot;Digital-Twin Assisted Reinforcement
                Learning for Mobility Robustness Optimization in 5G RANs&quot;. The work leverages Bayesian
                Digital Twin and Proximal Policy Optimization (PPO) (RL) to adjust cellular handover
                parameters HYST and TTT.
              </li>
              <li>
                Learned the complete software development lifecycle hands-on. Worked on live projects
                with professional teams. Adopted industry-standard practices and development tools like
                docker, redis, kafka etc.
              </li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionLabel>Education</SectionLabel>
          <div>
            {education.map((entry, i) => (
              <div
                key={entry.degree}
                className={`flex flex-wrap items-baseline justify-between gap-2 py-4 ${i > 0 ? 'border-t border-border/30' : ''}`}
              >
                <div>
                  <p className="font-semibold">{entry.degree}</p>
                  <p className="text-sm text-muted-foreground">{entry.school}</p>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <p>{entry.period} · {entry.location}</p>
                  <p>{entry.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionLabel>Projects</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/50 transition-all duration-300 p-5 space-y-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold leading-tight">{project.title}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{project.year}</span>
                </div>
                {project.callout && (
                  <p className="text-xs text-primary font-medium">{project.callout}</p>
                )}
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Extracurricular */}
        <section>
          <SectionLabel>Extracurricular</SectionLabel>
          <div>
            {extracurricular.map((entry, i) => (
              <div key={entry.title} className={`py-4 ${i > 0 ? 'border-t border-border/30' : ''}`}>
                <p className="font-semibold mb-1.5">{entry.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{entry.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

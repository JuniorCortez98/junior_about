import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Activity,
  HeartPulse,
  Database,
  Server,
  Layers,
  Code2,
  Users,
  CheckCircle2,
  Calendar,
  Building2,
  Stethoscope,
  Terminal,
  FileCode,
  Download,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Search,
  GraduationCap,
  Award,
  ArrowRight,
  Cpu,
  Play,
  Menu,
  X,
  MessageSquare,
  Clock,
  Briefcase,
  Filter,
  Brain,
  Sparkles,
  Workflow
} from 'lucide-react';

// Profile picture default path (relative for GitHub Pages compatibility)
const PROFILE_IMAGE = './junior-cortez.jpg';


// Types
interface TimelineStage {
  id: string;
  role: string;
  company: string;
  period: string;
  badge: string;
  summary: string;
  responsibilities: string[];
  techStack: string[];
  impactMetric: string;
}

interface SkillItem {
  name: string;
  category: 'consultoria' | 'interoperabilidad' | 'monitorizacion' | 'bbdd' | 'lenguajes' | 'competencias';
  level: string;
  description: string;
  tags: string[];
  icon: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  period: string;
  challenge: string;
  solution: string;
  results: string[];
  systems: string[];
}

export default function App() {
  // Navigation & Scroll
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Typewriter effect state
  const titles = useMemo(
    () => [
      'Consultor Funcional de Sistemas Sanitarios',
      'Especialista en Interoperabilidad (HL7 & Mirth ESB)',
      'Orquestación Clínica, RIS e IA Diagnóstica (CAD)',
      'Productividad & Automatización Asistencial con IA',
      'Ex-Referente de BBDD & Infraestructura (SQL Server & Dynatrace)',
      'Integrador Hospitalario Casiopea (EHR) & Departamentales'
    ],
    []
  );
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(85);

  // Timeline active selection
  const [activeTimelineStage, setActiveTimelineStage] = useState<string>('stage-1');

  // Skills filter & search
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // HL7 Simulator state
  const [selectedHl7Event, setSelectedHl7Event] = useState<'ADT' | 'ORM' | 'ORU' | 'MDM'>('ADT');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Copy toast state
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Interactive Ecosystem & Architecture Infogram Layer Filter
  const [activeLayer, setActiveLayer] = useState<'todas' | 'capa1' | 'capa2' | 'capa3'>('todas');


  // Scroll listener for sticky header and section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['inicio', 'evolucion', 'ecosistema', 'hitos', 'interoperabilidad', 'educacion', 'contacto'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect ticker
  useEffect(() => {
    const fullText = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(75);
        if (displayText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(35);
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(350);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, titles, typingSpeed]);

  // Copy handler with toast
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // Run HL7 Simulation
  const runHl7Simulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1100);
    setTimeout(() => setSimStep(3), 2400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 3800);
  };

  // Download vCard
  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Cortez García;Junior Alexander;;;
FN:Junior Alexander Cortez García
TITLE:Consultor Funcional de Sistemas Sanitarios & HL7
ORG:Inetum España
TEL;TYPE=CELL:+34665797189
EMAIL;TYPE=INTERNET:junior_98_cortez@outlook.es
URL:https://www.linkedin.com/in/junior-alexander-cortez-garcia-b8726a150
ADR;TYPE=HOME:;;Madrid;;;España
NOTE:Especialista en Sistemas Sanitarios, Casiopea EHR, HL7 y Mirth Connect
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Junior_Cortez_Contacto.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    handleCopy('+34 665 79 71 89', 'Tarjeta de contacto (vCard) descargada');
  };

  // Timeline data
  const timelineData: TimelineStage[] = [
    {
      id: 'stage-1',
      role: 'Consultoría Funcional e Implantación',
      company: 'Inetum España',
      period: '2025 - 2026',
      badge: 'Actualidad | Consultoría Asistencial',
      summary:
        'Liderazgo funcional y técnico en campo durante despliegues asistenciales críticos e interoperabilidad hospitalaria en Quirónsalud Zaragoza.',
      responsibilities: [
        'Participación activa en el arranque de campo e implantación in-situ en el nuevo Hospital Quirónsalud Zaragoza, asegurando la continuidad asistencial durante el go-live.',
        'Conducción de reuniones territoriales periódicas con el cliente sanitario para el seguimiento operativo, análisis de necesidades y priorización de tickets de impacto crítico.',
        'Análisis funcional de flujos de interoperabilidad (HL7 v2.x, Mirth ESB) conectando la Historia Clínica Electrónica Casiopea (EHR) con 6 subsistemas clave: RIS/PACS, ATLAS, SGLAC, ENDOBASE, ONCOFARM y PORTAL DEL PACIENTE.',
        'Interlocución directa y resolución funcional entre jefaturas de servicio médico, dirección asistencial y equipos de ingeniería de software.'
      ],
      techStack: ['Casiopea EHR', 'HL7 v2.5', 'Mirth Connect ESB', 'RIS/PACS', 'SGLAC', 'ATLAS', 'Oncofarm', 'Portal Paciente'],
      impactMetric: '100% de subsistemas integrados y estabilizados en Quirónsalud Zaragoza'
    },
    {
      id: 'stage-2',
      role: 'Arquitectura e Infraestructura Operativa',
      company: 'Inetum España',
      period: '2024 - 2026',
      badge: 'Disponibilidad, IA & Automatización',
      summary:
        'Supervisión y garantía de la alta disponibilidad operativa e impulso de la productividad técnica mediante herramientas de IA, agentes y automatización.',
      responsibilities: [
        'Monitorización proactiva con Dynatrace para supervisar entornos críticos de producción hospitalaria 24/7.',
        'Programación de tareas de fondo con Quartz Scheduler y gestión de interacciones del sistema vía Web Services (REST/SOAP).',
        'Uso de Microsoft Copilot para la mejora de la productividad técnica, análisis y soporte en desarrollo.',
        'Creación de agentes/bots personalizados y desarrollo de pequeñas aplicaciones internas para optimizar el flujo del conocimiento y automatizar procesos operativos.'
      ],
      techStack: ['Dynatrace APM', 'Microsoft Copilot', 'Agentes / Bots Personalizados', 'Apps Internas', 'Quartz Scheduler', 'Web Services (REST/SOAP)'],
      impactMetric: 'Automatización de flujos y 99.9% de disponibilidad operativa hospitalaria'
    },
    {
      id: 'stage-3',
      role: 'Especialización Técnica y Bases de Datos',
      company: 'Inetum España',
      period: '2023 - 2025',
      badge: 'Referente Técnico BBDD',
      summary:
        'Referente del equipo en arquitectura de datos relacionales, rendimiento de consultas complejas y soporte a la toma de decisiones clínicas.',
      responsibilities: [
        'Designado referente técnico del equipo en bases de datos Microsoft SQL Server, guiando mejores prácticas de desarrollo.',
        'Diseño y modelado de esquemas relacionales para módulos clínicos y administrativos.',
        'Optimización exhaustiva (Query Tuning) de consultas T-SQL complejas, índices agrupados/no agrupados y planes de ejecución.',
        'Desarrollo de Procedimientos Almacenados (Stored Procedures) y funciones avanzadas para procesamiento masivo de datos clínicos y reportes hospitalarios.'
      ],
      techStack: ['Microsoft SQL Server', 'T-SQL Tuning', 'Stored Procedures', 'Execution Plans', 'Power Query'],
      impactMetric: '+40% de mejora en tiempos de respuesta en consultas e informes masivos'
    },
    {
      id: 'stage-4',
      role: 'Técnico de Soporte de Aplicaciones',
      company: 'Inetum España',
      period: '2021 - 2023',
      badge: 'Cimientos Operativos N2/N3',
      summary:
        'Resolución de incidencias asistenciales, atención directa al usuario clínico y control de calidad en despliegues.',
      responsibilities: [
        'Soporte directo de Nivel 2 y 3 a usuarios finales del ámbito sanitario (facultativos, personal de enfermería, admisión y administración).',
        'Investigación minuciosa de causa raíz (RCA) y corrección de incidencias funcionales y operativas en los entornos de producción.',
        'Ejecución rigurosa de pruebas de validación de software (UAT) y homologación previa a despliegues y pases a producción.',
        'Documentación técnica de incidencias conocidas y elaboración de procedimientos de resolución rápida.'
      ],
      techStack: ['Soporte N2/N3', 'Validación de Software (QA/UAT)', 'Análisis Causa Raíz', 'Gestión de Incidencias', 'Atención Hospitalaria'],
      impactMetric: 'Reducción sostenida del backlog y aumento en la satisfacción del usuario clínico'
    }
  ];

  // Skills Data
  const skillsData: SkillItem[] = [
    // Consultoría & Implantación
    {
      name: 'Implantación Clínica In-situ',
      category: 'consultoria',
      level: 'Avanzado',
      description: 'Acompañamiento a pie de cama y en servicios hospitalarios (Urgencias, Quirófano, Consultas) durante el go-live.',
      tags: ['Hospitales', 'Go-Live', 'Gestión del Cambio'],
      icon: 'Stethoscope'
    },
    {
      name: 'Arranques Hospitalarios',
      category: 'consultoria',
      level: 'Especialista',
      description: 'Metodología integral de puesta en marcha asistencial probada con éxito en el Hospital Quirónsalud Zaragoza.',
      tags: ['Quirónsalud Zaragoza', 'Soporte Operacional', 'Estabilización'],
      icon: 'Building2'
    },
    {
      name: 'Comités Territoriales con Cliente',
      category: 'consultoria',
      level: 'Avanzado',
      description: 'Conducción de reuniones periódicas ejecutivas y de gobernanza con dirección médica y responsables IT.',
      tags: ['Gobernanza', 'Priorización', 'Stakeholders'],
      icon: 'Users'
    },
    {
      name: 'Atención a Tickets Críticos',
      category: 'consultoria',
      level: 'Experto',
      description: 'Gestión ágil de incidencias de severidad 1 que puedan impactar la atención médica o bloqueo de pacientes.',
      tags: ['SLA Crítico', 'Resolución Rápida', 'Root Cause'],
      icon: 'ShieldCheck'
    },

    // Interoperabilidad & Integración
    {
      name: 'HL7 (v2.x / v2.5)',
      category: 'interoperabilidad',
      level: 'Especialista',
      description: 'Estandarización y mapeo de mensajería sanitaria: ADT (Admisiones), ORM (Peticiones), ORU (Resultados) y MDM.',
      tags: ['HL7 v2.x', 'EHR Interoperability', 'Mensajería Clínica'],
      icon: 'Activity'
    },
    {
      name: 'Mirth Connect (NextGen Connect)',
      category: 'interoperabilidad',
      level: 'Avanzado',
      description: 'Orquestación de canales, transformadores JavaScript, filtros y enrutamiento ESB entre sistemas heterogéneos.',
      tags: ['Mirth ESB', 'Canales', 'Filtros & Mappers'],
      icon: 'Layers'
    },
    {
      name: 'Casiopea (EHR / Historia Clínica)',
      category: 'interoperabilidad',
      level: 'Avanzado',
      description: 'Sistema central de Historia Clínica Electrónica hospitalaria y coordinación de sus flujos departamentales.',
      tags: ['EHR', 'Historia Clínica', 'Core Hospitalario'],
      icon: 'HeartPulse'
    },
    {
      name: 'Integraciones Departamentales',
      category: 'interoperabilidad',
      level: 'Especialista',
      description: 'Interconexión con RIS/PACS, ATLAS (AP), SGLAC (Laboratorio), ENDOBASE, ONCOFARM y Portal del Paciente.',
      tags: ['RIS/PACS', 'SGLAC', 'ATLAS', 'Oncofarm', 'Endobase'],
      icon: 'Server'
    },
    {
      name: 'Web Services (REST & SOAP)',
      category: 'interoperabilidad',
      level: 'Avanzado',
      description: 'Consumo y supervisión de APIs hospitalarias, contratos WSDL y servicios REST JSON/XML para intercambio de datos.',
      tags: ['REST APIs', 'SOAP WSDL', 'Microservicios'],
      icon: 'Code2'
    },

    // Monitorización & Infraestructura
    {
      name: 'Dynatrace APM',
      category: 'monitorizacion',
      level: 'Referente Técnico',
      description: 'Supervisión en tiempo real de transacciones puras (PurePaths), detección de fallos de red y carga de servidores.',
      tags: ['APM', 'PurePaths', 'Alertas Proactivas'],
      icon: 'Cpu'
    },
    {
      name: 'Quartz Scheduler',
      category: 'monitorizacion',
      level: 'Avanzado',
      description: 'Configuración, calendarización y depuración de tareas en background para procesamiento de colas y datos nocturnos.',
      tags: ['Background Jobs', 'Cron Triggers', 'Automatización'],
      icon: 'Calendar'
    },
    {
      name: 'Auditoría de Logs e Incidencias',
      category: 'monitorizacion',
      level: 'Avanzado',
      description: 'Trazabilidad de eventos de sistema, análisis forense de fallos y auditoría de sincronizaciones erróneas.',
      tags: ['Log Analysis', 'Troubleshooting', 'Trazabilidad'],
      icon: 'Terminal'
    },

    // Bases de Datos & Análisis
    {
      name: 'Microsoft SQL Server',
      category: 'bbdd',
      level: 'Referente Técnico',
      description: 'Administración, modelado relacional, mantenimiento y resolución de bloqueos (deadlocks) en entornos de alta concurrencia.',
      tags: ['SQL Server', 'Deadlocks', 'BBDD Producción'],
      icon: 'Database'
    },
    {
      name: 'T-SQL Query Tuning',
      category: 'bbdd',
      level: 'Especialista',
      description: 'Optimización de planes de ejecución, refactorización de consultas pesadas y creación de índices eficientes.',
      tags: ['Execution Plans', 'Índices', 'Performance Tuning'],
      icon: 'FileCode'
    },
    {
      name: 'Procedimientos Almacenados (Stored Procs)',
      category: 'bbdd',
      level: 'Avanzado',
      description: 'Desarrollo de lógica de negocio transaccional robusta, triggers y scripts automatizados de mantenimiento.',
      tags: ['Stored Procedures', 'Triggers', 'Transacciones'],
      icon: 'FileCode'
    },
    {
      name: 'Power Query & Reportes',
      category: 'bbdd',
      level: 'Competente',
      description: 'Extracción, transformación y carga (ETL) de datos sanitarios para la elaboración de métricas y cuadros de mando.',
      tags: ['ETL', 'Data Cleanse', 'Business Intelligence'],
      icon: 'Layers'
    },

    // Lenguajes de Programación
    {
      name: 'Python',
      category: 'lenguajes',
      level: 'Competente',
      description: 'Scripting de utilidades, análisis de datos y parsing automatizado de ficheros sanitarios.',
      tags: ['Scripting', 'Data Processing', 'Automatización'],
      icon: 'Code2'
    },
    {
      name: 'Java',
      category: 'lenguajes',
      level: 'Competente',
      description: 'Desarrollo de componentes backend, extensiones y soporte en middlewares de integración.',
      tags: ['Backend', 'Servicios', 'Arquitectura'],
      icon: 'Code2'
    },
    {
      name: 'C++',
      category: 'lenguajes',
      level: 'Formación Sólida',
      description: 'Comprensión profunda de estructuras de memoria, algoritmos y fundamentos de sistemas de alto rendimiento.',
      tags: ['Estructuras de Datos', 'Algoritmia', 'Sistemas'],
      icon: 'Code2'
    },
    {
      name: 'JavaScript / HTML / CSS',
      category: 'lenguajes',
      level: 'Avanzado',
      description: 'Transformadores personalizados en Mirth Connect, scripts web y desarrollo de interfaces modernas.',
      tags: ['Mirth Transformers', 'DOM', 'Tailwind CSS'],
      icon: 'Code2'
    },

    // Competencias Clave
    {
      name: 'Resolución de Incidencias & Gestión de Crisis',
      category: 'competencias',
      level: 'Experto',
      description: 'Capacidad demostrada para mantener la calma y ejecutar planes de contención bajo alta presión hospitalaria.',
      tags: ['Resiliencia', 'Crisis Management', 'Toma de Decisiones'],
      icon: 'ShieldCheck'
    },
    {
      name: 'Traducción Clínico-Técnica',
      category: 'competencias',
      level: 'Especialista',
      description: 'Habilidad diferencial para comprender el vocabulario médico y convertirlo en especificaciones de software exactas.',
      tags: ['Empatía Asistencial', 'Análisis Funcional', 'Interlocución'],
      icon: 'HeartPulse'
    },
    {
      name: 'Trabajo en Equipo & Liderazgo Transversal',
      category: 'competencias',
      level: 'Avanzado',
      description: 'Coordinación fluida entre equipos multidisciplinares: soporte, administradores de sistemas, desarrolladores y clientes.',
      tags: ['Colaboración', 'Mentoring', 'Visión 360°'],
      icon: 'Users'
    },

    // IA & Productividad Asistencial (Nuevo CV)
    {
      name: 'Microsoft Copilot para Productividad',
      category: 'ia-productividad',
      level: 'Avanzado',
      description: 'Aceleración de análisis funcional, síntesis de especificaciones técnicas, resolución de incidencias complejas y documentación operativa.',
      tags: ['Copilot', 'Productividad IT', 'Documentación Ágil'],
      icon: 'Cpu'
    },
    {
      name: 'Creación de Agentes & Bots Personalizados',
      category: 'ia-productividad',
      level: 'Avanzado',
      description: 'Diseño e implementación de asistentes conversacionales y bots a medida para consulta de procedimientos y optimización de flujos operativos.',
      tags: ['Custom Agents', 'Bots Operativos', 'Automatización'],
      icon: 'Brain'
    },
    {
      name: 'Apps Internas de Gestión del Conocimiento',
      category: 'ia-productividad',
      level: 'Avanzado',
      description: 'Desarrollo de herramientas y aplicaciones internas para canalizar flujos de trabajo técnicos hospitalarios y automatizar tareas repetitivas.',
      tags: ['Apps Internas', 'Knowledge Base', 'Flujos Operativos'],
      icon: 'Workflow'
    },
    {
      name: 'Orquestación e IA Diagnóstica (CAD)',
      category: 'ia-productividad',
      level: 'Especialista',
      description: 'Arquitectura de integración para algoritmos de triaje y pre-análisis de imagen (detección de ictus y volumetría) con priorización de worklist.',
      tags: ['CAD IA', 'Triage Radiológico', 'Priorización Automática'],
      icon: 'Sparkles'
    }
  ];

  // Filtered skills
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = selectedCategory === 'todos' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Case Studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 'quiron-zaragoza',
      title: 'Arranque Integral Hospital Quirónsalud Zaragoza',
      subtitle: 'Puesta en marcha asistencial y soporte in-situ durante el go-live',
      client: 'Hospital Quirónsalud Zaragoza & Inetum',
      period: '2025 - 2026',
      challenge:
        'La apertura del nuevo hospital requería migrar y sincronizar en caliente toda la actividad clínica hacia el sistema Casiopea EHR, garantizando cero pérdidas de datos y soporte presencial continuo a los profesionales sanitarios en su primera jornada asistencial.',
      solution:
        'Despliegue operativo in-situ en quirófanos, urgencias, hospitalización y consultas externas. Coordinación en tiempo real con soporte central, resolución in situ de permisos, flujos y validación de interconexión con los subsistemas departamentales.',
      results: [
        'Arranque hospitalario completado sin interrupciones en la atención a pacientes.',
        'Más de 100 profesionales asistenciales acompañados directamente durante la primera semana.',
        'Estabilización de incidencias críticas en menos de 2 horas de respuesta promedio.'
      ],
      systems: ['Casiopea EHR', 'Urgencias', 'Quirófano', 'Consultas Externas', 'Admisiones']
    },
    {
      id: 'gobierno-territorial',
      title: 'Gobierno Territorial de Incidencias Sanitarias',
      subtitle: 'Comités periódicos de priorización y gestión de crisis asistenciales',
      client: 'Red de Centros Hospitalarios',
      period: '2024 - 2026',
      challenge:
        'Acumulación de peticiones y discrepancias entre las expectativas clínicas y los tiempos de desarrollo IT, generando retrasos en la operativa hospitalaria y riesgos en el cumplimiento de los Acuerdos de Nivel de Servicio (SLAs).',
      solution:
        'Instauración y conducción de mesas de trabajo y comités territoriales periódicos con los responsables médicos y técnicos. Filtrado funcional riguroso, traducción de la casuística clínica a impacto técnico y priorización consensuada del backlog.',
      results: [
        'Reducción del 35% en la recurrencia de incidencias operativas comunes.',
        'Mejora sustancial en la confianza entre dirección asistencial y el equipo de soporte.',
        'Canalización directa de peticiones de cambio con especificaciones funcionales listas para desarrollo.'
      ],
      systems: ['Comités Territoriales', 'Jira / Service Desk', 'Gestión de SLAs', 'Matriz de Riesgos']
    },
    {
      id: 'interoperabilidad-hl7',
      title: 'Integración Multidepartamental HL7 & Mirth Connect',
      subtitle: 'Ecosistema de interoperabilidad entre Casiopea y 6 subsistemas médicos',
      client: 'Inetum / Quirónsalud',
      period: '2024 - 2026',
      challenge:
        'Cada departamento hospitalario opera con su propio software de nicho (Laboratorio, Anatomía Patológica, Oncología, Imagen, Endoscopias). La falta de un flujo estandarizado provocaba duplicidad de pacientes y demoras en los informes.',
      solution:
        'Diseño y validación de canales en Mirth Connect para enrutar mensajería HL7 v2.5. Implementación de transacciones ADT (altas/ingresos/traslados), peticiones de pruebas (ORM) y recepción automatizada de resultados e informes validados (ORU y MDM).',
      results: [
        'Sincronización bidireccional en tiempo real entre Casiopea y los 6 subsistemas.',
        'Trazabilidad total desde que el facultativo solicita la prueba hasta la recepción del informe firmado.',
        'Disponibilidad inmediata de resultados en el Portal del Paciente para el usuario final.'
      ],
      systems: ['HL7 v2.5', 'Mirth Connect', 'RIS/PACS', 'ATLAS (AP)', 'SGLAC (Lab)', 'Oncofarm', 'Endobase', 'Portal Paciente']
    },
    {
      id: 'orquestacion-ia-diagnostica',
      title: 'Ecosistema de Interoperabilidad Sanitaria Avanzada',
      subtitle: 'Flujo Clínico, Físico (Plexus) e Inteligencia Artificial Diagnóstica (CAD)',
      client: 'Inetum / Quirónsalud & Red Radiológica',
      period: '2025 - 2026',
      challenge:
        'Conectar armónicamente el cerebro clínico (HIS Casiopea) con el Patient Journey físico en hospital (kioskos autoadmisión Plexus) y el flujo radiológico (RIS Carestream/GE TAC), integrando una capa de Inteligencia Artificial Diagnóstica capaz de pre-analizar estudios y priorizar casos críticos (código ictus, tumores) en tiempo récord.',
      solution:
        'Orquestación tri-capa end-to-end: Capa 1 (Casiopea como motor maestro de citas y peticiones HL7 ORM), Capa 2 (Plexus para auto-checkin con DNI/tarjeta, llamador y aviso de llegada automático a Casiopea), y Capa 3 (RIS Carestream VUE, DICOM MWL hacia TAC sin tecleo manual, Mirth ESB y Orquestador de Flujo con IA Diagnóstica CAD que pre-analiza imágenes y altera dinámicamente la lista de trabajo del radiólogo para situar casos críticos en el N.º 1, cerrando con HL7 ORU y visor HTML5 VUE Motion integrado en la HCE).',
      results: [
        'Priorización automática al N.º 1 en lista de trabajo para patologías tiempo-dependientes (Código Ictus / Tumores).',
        'Eliminación del 100% del tecleo manual para técnicos de rayos mediante DICOM Modality Worklist (MWL).',
        'Trazabilidad integral desde la citación en kiosko hasta el dictado e informe firmado en Casiopea.',
        'Perfil Puente Validado: Dominio simultáneo de HIS (Maestro) + Plexus (Patient Journey) + Mirth (Integración) + RIS/IA con visión global.'
      ],
      systems: ['HIS Casiopea', 'Kiosko Plexus', 'Mirth Connect ESB', 'RIS Carestream VUE', 'GE Healthcare TAC', 'IA Diagnóstica CAD', 'Visor VUE Motion']
    }
  ];

  // HL7 message samples for the interactive inspector
  const hl7Samples = {
    ADT: {
      name: 'Ingreso Hospitalario (ADT^A01)',
      target: 'Casiopea EHR -> Mirth ESB -> Departamentales',
      description: 'Notifica el ingreso de un paciente en planta o urgencias para sincronizar sus datos demográficos en todos los subsistemas.',
      raw: `MSH|^~\\&|CASIOPEA|HOSP_ZARAGOZA|MIRTH_ESB|HOSP_ROUTER|20261017093000||ADT^A01|MSG00984712|P|2.5\nEVN|A01|20261017093000\nPID|1||NHC-849201^^^HOSP_ZGZ^MR||GARCIA^SANCHEZ^CARMEN||19840512|F|||C/ SAN IGNACIO 14^^ZARAGOZA^50008||+34611223344\nPV1|1|I|URG^BOX-04^01|E|||10492^MARTINEZ^ALEJANDRO^^^DR|||||||||||V98214^^^VISIT|||||||||||||||||||HOSP_ZARAGOZA|||20261017092800`,
      explanation: [
        'MSH: Mensaje de Casiopea hacia el bus Mirth con versión HL7 2.5',
        'PID: Demografía de la paciente (NHC, Nombre, Fecha Nacimiento, Dirección)',
        'PV1: Ubicación asistencial actual (Urgencias Box 04, Médico asignado)'
      ]
    },
    ORM: {
      name: 'Petición Analítica a Laboratorio (ORM^O01)',
      target: 'Casiopea EHR -> Mirth ESB -> SGLAC (Laboratorio)',
      description: 'Envío de una orden de analítica de sangre y coagulación desde la estación clínica al sistema de laboratorio.',
      raw: `MSH|^~\\&|CASIOPEA|HOSP_ZARAGOZA|SGLAC_LAB|MIRTH_ESB|20261017101522||ORM^O01|ORD992384|P|2.5\nPID|1||NHC-849201^^^HOSP_ZGZ^MR||GARCIA^SANCHEZ^CARMEN||19840512|F\nPV1|1|I|URG^BOX-04^01\nORC|NW|ORD-2026-8812|||||1^URGENTE||20261017101500|10492^MARTINEZ^ALEJANDRO\nOBR|1|ORD-2026-8812||HEM^HEMOGRAMA COMPLETO^LAB|||20261017102000|||||||||10492^MARTINEZ^ALEJANDRO`,
      explanation: [
        'ORC: Orden de tipo NW (Nueva Petición) con prioridad Urgente',
        'OBR: Petición del estudio HEM (Hemograma Completo y Coagulación)',
        'Enrutado por Mirth Connect aplicando validación de formato antes de entrega en SGLAC'
      ]
    },
    ORU: {
      name: 'Resultados Validados de Laboratorio (ORU^R01)',
      target: 'SGLAC -> Mirth ESB -> Casiopea EHR & Portal Paciente',
      description: 'El laboratorio emite los valores numéricos y rangos de normalidad validados por el analista clínico.',
      raw: `MSH|^~\\&|SGLAC_LAB|BIOQUIMICA|CASIOPEA|MIRTH_ESB|20261017114510||ORU^R01|RES883201|P|2.5\nPID|1||NHC-849201^^^HOSP_ZGZ^MR||GARCIA^SANCHEZ^CARMEN||19840512|F\nOBR|1|ORD-2026-8812||HEM^HEMOGRAMA COMPLETO|||20261017114200|||||||||FACULTATIVO_FIRMA\nOBX|1|NM|GLU^GLUCOSA EN SUERO^LN||104|mg/dL|70-110|N|||F|||20261017114000\nOBX|2|NM|HB^HEMOGLOBINA^LN||13.8|g/dL|12.0-15.5|N|||F|||20261017114000\nOBX|3|NM|LEUC^LEUCOCITOS^LN||7.4|10^3/uL|4.0-10.0|N|||F|||20261017114000`,
      explanation: [
        'OBX 1: Glucosa 104 mg/dL (Rango 70-110, Estado Normal N)',
        'OBX 2: Hemoglobina 13.8 g/dL (Normal)',
        'OBX 3: Leucocitos 7.4 (Normal), Estado F (Resultado Final Firmado)'
      ]
    },
    MDM: {
      name: 'Informe Radiológico Firmado (MDM^T02)',
      target: 'RIS/PACS -> Mirth ESB -> Casiopea EHR',
      description: 'Informe médico estructurado o documento clínico adjunto validado por el servicio de Radiodiagnóstico.',
      raw: `MSH|^~\\&|RIS_PACS|RADIODIAGNOSTICO|CASIOPEA|MIRTH_ESB|20261017122045||MDM^T02|DOC77421|P|2.5\nPID|1||NHC-849201^^^HOSP_ZGZ^MR||GARCIA^SANCHEZ^CARMEN||19840512|F\nPV1|1|I|URG^BOX-04^01\nTXA|1|CN|TX|20261017121500|||||RAD-99120^GONZALEZ^MIGUEL||||||||||DOC-FINAL\nOBX|1|TX|INFORME_RX^RX TORAX PA Y LATERAL||SIN HALLAZGOS PATOLOGICOS AGUDOS. INDICE CARDIOTORACICO NORMAL. SENOS COSTOFRENICOS LIBRES.`,
      explanation: [
        'TXA: Metadatos del documento médico (Fecha firma, Autor radiólogo)',
        'OBX: Texto estructurado del informe para visualización en la Historia Clínica'
      ]
    }
  };

  // Resolve custom icon for each skill
  const renderSkillIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-sky-400';
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'HeartPulse':
        return <HeartPulse className={iconClass} />;
      case 'Server':
        return <Server className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Calendar':
        return <Calendar className={iconClass} />;
      case 'Database':
        return <Database className={iconClass} />;
      case 'FileCode':
        return <FileCode className={iconClass} />;
      case 'Brain':
        return <Brain className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Workflow':
        return <Workflow className={iconClass} />;
      default:
        return <Terminal className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 bg-executive-mesh relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {copiedItem && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl shadow-2xl backdrop-blur-md">
          <Check className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium">{copiedItem}</span>
        </div>
      )}

      {/* HEADER / NAVIGATION (Sober & Executive) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b1120]/90 backdrop-blur-md border-b border-slate-800 shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 font-bold text-sm tracking-wide group-hover:border-sky-500/60 transition-colors">
              JC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100 tracking-tight text-base sm:text-lg group-hover:text-sky-400 transition-colors">
                  Junior Cortez
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <span className="text-xs text-slate-400 block -mt-0.5">Consultor Sanitario | HL7</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'evolucion', label: 'Evolución' },
              { id: 'ecosistema', label: 'Ecosistema & Stack' },
              { id: 'hitos', label: 'Hitos' },
              { id: 'interoperabilidad', label: 'HL7 & Mirth' },
              { id: 'educacion', label: 'Formación' },
              { id: 'contacto', label: 'Contacto' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'text-sky-400 bg-slate-800/80 font-semibold border border-slate-700/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/junior-alexander-cortez-garcia-b8726a150"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="LinkedIn Oficial"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contactar</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0b1120] border-b border-slate-800 px-4 pt-3 pb-6 shadow-xl space-y-1">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'evolucion', label: 'Evolución Profesional' },
              { id: 'ecosistema', label: 'Ecosistema & Stack' },
              { id: 'hitos', label: 'Hitos Destacados' },
              { id: 'interoperabilidad', label: 'Interoperabilidad HL7' },
              { id: 'educacion', label: 'Formación Académica' },
              { id: 'contacto', label: 'Contacto Directo' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === link.id
                    ? 'text-sky-400 bg-slate-800/80 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-sky-600 text-white font-medium text-sm"
              >
                <Mail className="w-4 h-4" />
                Contactar Directamente
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION (Sober, Elegant & Authoritative) */}
      <section id="inicio" className="pt-32 pb-20 md:pt-40 md:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Bio, Experience & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Executive badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/70 border border-slate-700/80 text-slate-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Disponible para proyectos e implantaciones hospitalarias</span>
              </div>

              {/* Name & Typewriter Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Junior A. <span className="text-sky-400">Cortez García</span>
                </h1>
                
                <div className="mt-3 flex items-center min-h-[38px] text-lg sm:text-xl font-medium text-slate-300">
                  <Terminal className="w-5 h-5 mr-2 text-sky-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{displayText}</span>
                  <span className="inline-block w-2 h-5 bg-sky-400 ml-1 animate-pulse"></span>
                </div>
              </div>

              {/* Executive Summary Pitch */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Especialista en <strong className="text-white font-semibold">Sistemas de Información Sanitaria</strong> con más de 5 años de trayectoria. Inicié como técnico de soporte N2, pasé a ser el referente técnico de <strong className="text-white font-semibold">Bases de Datos e Infraestructura (Dynatrace)</strong> y actualmente me enfoco en la <strong className="text-sky-400 font-semibold">consultoría funcional</strong>. Experiencia demostrada en arranques hospitalarios (ej. <em className="text-white not-italic font-medium">Hospital Quirónsalud Zaragoza</em>) y gestión de integraciones departamentales, destacando por traducir necesidades clínicas en soluciones técnicas eficaces.
              </p>

              {/* Professional Slogan Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Visión Profesional</span>
                  <span className="text-slate-100 font-medium">"Listo para afrontar nuevos retos y liderar la integración técnica de entornos asistenciales complejos."</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contactar Directamente</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/junior-alexander-cortez-garcia-b8726a150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>Ver Perfil en LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={() => handleCopy('+34 665 79 71 89', 'Teléfono copiado: +34 665 79 71 89')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm border border-slate-800 transition-colors"
                  title="Copiar teléfono"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>+34 665 79 71 89</span>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Location Pill */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Madrid, España</span>
                <span className="text-slate-600">•</span>
                <button
                  onClick={() => handleCopy('junior_98_cortez@outlook.es', 'Email copiado: junior_98_cortez@outlook.es')}
                  className="hover:text-sky-400 underline decoration-slate-700 transition-colors"
                >
                  junior_98_cortez@outlook.es
                </button>
              </div>

            </div>

            {/* Right: Authentic Portrait (Clean, Sober & Tailored) */}
            {/* Right: Authentic Executive Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Executive Frame */}
                <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 p-3.5 shadow-xl">
                  
                  {/* Photo container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300 group">
                    <img
                      src={PROFILE_IMAGE}
                      alt="Junior A. Cortez García"
                      className="w-full h-full object-cover object-top filter brightness-100 contrast-100 transition-transform duration-500 group-hover:scale-102"
                      onError={(e) => {
                        console.warn('Profile image fallback');
                      }}
                    />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Junior A. Cortez García</p>
                        <p className="text-[11px] text-slate-400">Consultoría e Implantación Sanitaria</p>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                        Inetum
                      </span>
                    </div>
                  </div>

                  {/* Summary Metric Chips */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <div className="text-lg font-bold text-white">+5 Años</div>
                      <div className="text-[11px] text-slate-400">Sistemas Sanitarios</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <div className="text-lg font-bold text-sky-400">Quirónsalud</div>
                      <div className="text-[11px] text-slate-400">Hospital Zaragoza</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Core Metrics Bar (Sober Slate Design) */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs uppercase font-semibold tracking-wider">Trayectoria</span>
                <Calendar className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white">+5 Años</div>
              <p className="text-xs text-slate-400 mt-1">Evolución transversal en Inetum España</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs uppercase font-semibold tracking-wider">Arranque Crítico</span>
                <Building2 className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white">Quirónsalud ZGZ</div>
              <p className="text-xs text-slate-400 mt-1">Implantación in-situ y soporte clínico</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs uppercase font-semibold tracking-wider">Interoperabilidad</span>
                <Layers className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white">6+ Subsistemas</div>
              <p className="text-xs text-slate-400 mt-1">HL7 / Mirth: RIS, LAB, ATLAS, Oncofarm...</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs uppercase font-semibold tracking-wider">Infraestructura</span>
                <Cpu className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white">Dynatrace & SQL</div>
              <p className="text-xs text-slate-400 mt-1">Monitorización APM y optimización T-SQL</p>
            </div>
          </div>

        </div>
      </section>

      {/* EVOLUCIÓN PROFESIONAL (TIMELINE INTERACTIVO) */}
      <section id="evolucion" className="py-20 bg-slate-900/60 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>Trayectoria 360°</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Evolución Profesional en <span className="text-sky-400">Inetum España</span>
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Una progresión sólida de más de 5 años: desde el soporte operativo a pie de trinchera hasta la arquitectura de datos y la consultoría funcional de alta responsabilidad.
            </p>
          </div>

          {/* Interactive Stage Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {timelineData.map((stage, idx) => {
              const isSelected = activeTimelineStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveTimelineStage(stage.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-sky-500 shadow-lg shadow-black/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Etapa 0{4 - idx}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{stage.period}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 leading-snug">{stage.role}</h3>
                  <p className="text-xs text-sky-400 mt-1 font-medium">{stage.badge}</p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Card */}
          {(() => {
            const current = timelineData.find((s) => s.id === activeTimelineStage) || timelineData[0];
            return (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Responsibilities */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold">
                        {current.company} • {current.period}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {current.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{current.role}</h3>
                    
                    <p className="text-slate-300 text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                      {current.summary}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        <span>Responsabilidades Clave y Actuaciones de Campo:</span>
                      </h4>
                      <ul className="space-y-3">
                        {current.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sky-400 mt-2"></span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Stack & Impact */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <Award className="w-4 h-4" />
                        <span>Impacto Aportado</span>
                      </div>
                      <p className="text-white font-medium text-sm leading-snug">{current.impactMetric}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Tecnologías & Entornos Clave:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {current.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700/80 text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ECOSISTEMA SANITARIO & STACK TECNOLÓGICO */}
      <section id="ecosistema" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Competencias Técnicas & Funcionales</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ecosistema Sanitario & <span className="text-sky-400">Stack Tecnológico</span>
              </h2>
              <p className="text-slate-400 mt-2 text-base max-w-2xl">
                Especialización técnica combinada con dominio de estándares clínicos, motores de integración y gestión de sistemas de misión crítica.
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar habilidad o sistema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Mobile Category Dropdown (Ensures 100% accessible navigation on phones) */}
          <div className="sm:hidden mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="mobile-cat-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-sky-400" />
                <span>Módulo de Especialidad</span>
              </label>
              <span className="text-xs text-sky-400 font-mono font-medium">
                {selectedCategory === 'todos' ? 'Todos los módulos' : selectedCategory}
              </span>
            </div>
            <div className="relative">
              <select
                id="mobile-cat-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-900 border border-slate-700 text-white py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-sky-500 shadow-md"
              >
                <option value="todos">Todos los Módulos ({skillsData.length})</option>
                <option value="consultoria">Consultoría & Implantación ({skillsData.filter(s => s.category === 'consultoria').length})</option>
                <option value="ia-productividad">IA & Productividad Asistencial ({skillsData.filter(s => s.category === 'ia-productividad').length})</option>
                <option value="interoperabilidad">Interoperabilidad & Integración ({skillsData.filter(s => s.category === 'interoperabilidad').length})</option>
                <option value="monitorizacion">Monitorización & Infraestructura ({skillsData.filter(s => s.category === 'monitorizacion').length})</option>
                <option value="bbdd">Bases de Datos & Análisis ({skillsData.filter(s => s.category === 'bbdd').length})</option>
                <option value="lenguajes">Lenguajes de Programación ({skillsData.filter(s => s.category === 'lenguajes').length})</option>
                <option value="competencias">Competencias Clave ({skillsData.filter(s => s.category === 'competencias').length})</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Responsive Category Pills (Desktop & Tablet: Wraps gracefully, NO horizontal cut off!) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
            {[
              { id: 'todos', label: 'Todos los Módulos', short: 'Todos', icon: Layers, count: skillsData.length },
              { id: 'consultoria', label: 'Consultoría & Implantación', short: 'Consultoría', icon: Stethoscope, count: skillsData.filter(s => s.category === 'consultoria').length },
              { id: 'ia-productividad', label: 'IA & Productividad Asistencial', short: 'IA & Bots', icon: Brain, count: skillsData.filter(s => s.category === 'ia-productividad').length },
              { id: 'interoperabilidad', label: 'Interoperabilidad & Integración', short: 'Interoperabilidad', icon: Activity, count: skillsData.filter(s => s.category === 'interoperabilidad').length },
              { id: 'monitorizacion', label: 'Monitorización & Infraestructura', short: 'Monitorización', icon: Server, count: skillsData.filter(s => s.category === 'monitorizacion').length },
              { id: 'bbdd', label: 'Bases de Datos & Análisis', short: 'Bases de Datos', icon: Database, count: skillsData.filter(s => s.category === 'bbdd').length },
              { id: 'lenguajes', label: 'Lenguajes de Programación', short: 'Lenguajes', icon: Code2, count: skillsData.filter(s => s.category === 'lenguajes').length },
              { id: 'competencias', label: 'Competencias Clave', short: 'Competencias', icon: Users, count: skillsData.filter(s => s.category === 'competencias').length }
            ].map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-sky-600 text-white font-semibold shadow-md ring-2 ring-sky-400/40'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.short}</span>
                  <span
                    className={`ml-1 text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-sky-700/80 text-sky-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter & Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span>Mostrando <strong className="text-white font-semibold">{filteredSkills.length}</strong> de <strong className="text-white font-semibold">{skillsData.length}</strong> capacidades</span>
              {selectedCategory !== 'todos' && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 font-medium">
                  {selectedCategory === 'consultoria' && 'Consultoría & Implantación'}
                  {selectedCategory === 'ia-productividad' && 'IA & Productividad Asistencial'}
                  {selectedCategory === 'interoperabilidad' && 'Interoperabilidad & Integración'}
                  {selectedCategory === 'monitorizacion' && 'Monitorización & Infraestructura'}
                  {selectedCategory === 'bbdd' && 'Bases de Datos & Análisis'}
                  {selectedCategory === 'lenguajes' && 'Lenguajes de Programación'}
                  {selectedCategory === 'competencias' && 'Competencias Clave'}
                </span>
              )}
            </div>

            {(selectedCategory !== 'todos' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                }}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>


          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-md flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      {renderSkillIcon(skill.icon)}
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HITOS DESTACADOS / CASOS DE USO REALES */}
      <section id="hitos" className="py-20 bg-slate-900/60 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Casos de Éxito Asistencial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hitos Destacados & <span className="text-sky-400">Casos de Uso</span>
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Proyectos hospitalarios de alta exigencia donde la precisión técnica y la coordinación humana fueron decisivas.
            </p>
          </div>

          <div className="space-y-6">
            {caseStudies.map((study, idx) => (
              <div
                key={study.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Metadata */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
                          Caso de Estudio
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight mt-0.5">{study.title}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400">{study.subtitle}</p>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Entorno:</span>
                        <span className="text-slate-200 font-medium">{study.client}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Periodo:</span>
                        <span className="text-sky-400 font-mono">{study.period}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {study.systems.map((sys, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Challenge, Solution & Validated Results */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                          El Reto Operativo
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                          La Solución Aplicada
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Resultados Validados en Producción:</span>
                      </h4>
                      <div className="space-y-1.5">
                        {study.results.map((res, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ARQUITECTURA DE INTEROPERABILIDAD SANITARIA AVANZADA (INFOGRAMA & HITO DE ORQUESTACIÓN IA) */}
          <div className="mt-16 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-2">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Infograma de Arquitectura & Hito de Orquestación</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ecosistema de Interoperabilidad Sanitaria Avanzada
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Flujo Clínico, Físico (Patient Journey) e Inteligencia Artificial Diagnóstica (CAD)
                </p>
              </div>

              {/* Protocol Badges */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-sky-400">HL7 (ORM/SIU/ORU)</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-emerald-400">DICOM MWL</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-indigo-400">IA CAD (Triage)</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-amber-400">URL Contextual</span>
              </div>
            </div>

            {/* Interactive Layer Filter Selector */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-sky-400" />
                <span>Explorar Capa:</span>
              </span>
              {[
                { id: 'todas', label: 'Ecosistema Completo (Visión Global 360°)' },
                { id: 'capa1', label: 'Capa 1: Cerebro Clínico & Agendas (Casiopea)' },
                { id: 'capa2', label: 'Capa 2: Patient Journey Físico (Plexus)' },
                { id: 'capa3', label: 'Capa 3: Flujo Radiológico & Capa IA (RIS / CAD)' }
              ].map((layer) => {
                const isSelected = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white font-semibold shadow-md ring-1 ring-sky-400/50'
                        : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>

            {/* Architecture Visual Grid */}
            <div className="mt-6 space-y-4">
              
              {/* CAPA 1: EL CEREBRO CLÍNICO Y MAESTRO DE AGENDAS (CASIOPEA CÉNTRICA) */}
              {(activeLayer === 'todas' || activeLayer === 'capa1') && (
                <div className="p-5 rounded-xl bg-slate-950 border border-sky-900/60 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-300">
                        Capa 1: El Cerebro Clínico y Maestro de Agendas (Casiopea Céntrica)
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      Motor Maestro HCE & Citaciones
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    
                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center font-bold text-[11px]">1</span>
                        <span className="font-mono text-[10px] text-sky-400 font-semibold">HL7 ORM</span>
                      </div>
                      <p className="font-semibold text-white">Petición Clínica</p>
                      <p className="text-[11px] text-slate-400 mt-1">Médico peticionario solicita prueba diagnóstica (ej. TAC Cerebral urgente).</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center font-bold text-[11px]">2</span>
                        <span className="font-mono text-[10px] text-sky-400 font-semibold">HIS/HCE</span>
                      </div>
                      <p className="font-semibold text-white">HIS Casiopea (Maestro)</p>
                      <p className="text-[11px] text-slate-400 mt-1">Dueño de la historia clínica, citas, salas y reglas de negocio asistenciales.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center font-bold text-[11px]">14</span>
                        <span className="font-mono text-[10px] text-amber-400 font-semibold">URL Context</span>
                      </div>
                      <p className="font-semibold text-white">VUE Motion Visor Web</p>
                      <p className="text-[11px] text-slate-400 mt-1">Visor HTML5 Zero-Footprint embebido por contexto URL en la HCE del médico.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center font-bold text-[11px]">15</span>
                        <span className="font-mono text-[10px] text-emerald-400 font-semibold">HL7 ORU</span>
                      </div>
                      <p className="font-semibold text-white">Cierre del Ciclo Clínico</p>
                      <p className="text-[11px] text-slate-400 mt-1">Informe validado y firmado disponible para el médico peticionario en Casiopea.</p>
                    </div>

                  </div>
                </div>
              )}

              {/* CAPA 2: EL GESTOR DEL 'PATIENT JOURNEY' FÍSICO (PLEXUS INTEGRADO) */}
              {(activeLayer === 'todas' || activeLayer === 'capa2') && (
                <div className="p-5 rounded-xl bg-slate-950 border border-cyan-900/60 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300">
                        Capa 2: El Gestor del 'Patient Journey' Físico (Plexus Integrado)
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      Autoadmisión, Salas y Turnos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    
                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center font-bold text-[11px]">5</span>
                        <span className="font-mono text-[10px] text-cyan-400 font-semibold">HL7 SIU</span>
                      </div>
                      <p className="font-semibold text-white">Gestión Centralizada</p>
                      <p className="text-[11px] text-slate-400 mt-1">Sincronización continua de citas y actualización de agendas (SIU Schedule Update).</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center font-bold text-[11px]">6</span>
                        <span className="font-mono text-[10px] text-cyan-400 font-semibold">DNI / Tarjeta</span>
                      </div>
                      <p className="font-semibold text-white">Kiosko Autoadmisión</p>
                      <p className="text-[11px] text-slate-400 mt-1">Autocheck-in autónomo del paciente sin esperas en mostradores de admisión.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center font-bold text-[11px]">7</span>
                        <span className="font-mono text-[10px] text-cyan-400 font-semibold">Status Llegada</span>
                      </div>
                      <p className="font-semibold text-white">Aviso de Paciente en Sala</p>
                      <p className="text-[11px] text-slate-400 mt-1">Plexus comunica a Casiopea la presencia real del paciente para aviso inmediato al técnico.</p>
                    </div>

                  </div>
                </div>
              )}

              {/* CAPA 3: EL FLUJO RADIOLÓGICO Y CAPA INTELIGENTE (RIS E IA) */}
              {(activeLayer === 'todas' || activeLayer === 'capa3') && (
                <div className="p-5 rounded-xl bg-slate-950 border border-indigo-900/60 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-300">
                        Capa 3: El Flujo Radiológico y Capa Inteligente (RIS e IA Diagnóstica)
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      Mirth ESB + RIS + TAC + Orquestador CAD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    
                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-[11px]">3</span>
                        <span className="font-mono text-[10px] text-indigo-400 font-semibold">Mirth ESB</span>
                      </div>
                      <p className="font-semibold text-white">ESB Mirth Connect</p>
                      <p className="text-[11px] text-slate-400 mt-1">Transformación de sintaxis, normalización y enrutamiento fiable de HL7.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-[11px]">9-10</span>
                        <span className="font-mono text-[10px] text-emerald-400 font-semibold">DICOM MWL</span>
                      </div>
                      <p className="font-semibold text-white">Modalidad TAC (GE)</p>
                      <p className="text-[11px] text-slate-400 mt-1">El técnico realiza la prueba sin tecleo manual; la lista de trabajo baja directamente por MWL.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-indigo-950/50 border border-indigo-500/50 ring-1 ring-indigo-500/30">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-800 border border-indigo-400 text-white flex items-center justify-center font-bold text-[11px]">11</span>
                        <span className="font-mono text-[10px] text-indigo-300 font-semibold animate-pulse">CAD ALERT</span>
                      </div>
                      <p className="font-semibold text-indigo-200">IA Diagnóstica (CAD)</p>
                      <p className="text-[11px] text-slate-300 mt-1">Pre-análisis automático: detección inmediata de ictus y cuantificación tumoral.</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-[11px]">12-13</span>
                        <span className="font-mono text-[10px] text-amber-400 font-semibold">Triage Automático</span>
                      </div>
                      <p className="font-semibold text-white">Orquestador de Worklist</p>
                      <p className="text-[11px] text-slate-400 mt-1">Priorización dinámica: reordena la lista del radiólogo y sitúa el caso crítico al N.º 1.</p>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Differentiating Value Banner (Bridge Profile) */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-900/60 border border-sky-600/50 text-sky-300 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">
                    VALOR DIFERENCIAL (Bridge Profile):
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Conocimiento integral de <strong>HIS Casiopea (Maestro)</strong> + <strong>Plexus (Patient Journey Físico)</strong> + <strong>Mirth ESB (Integración)</strong> para implantar proyectos de <strong>RIS / IA Diagnóstica</strong> con visión global.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 text-sky-400 border border-slate-800 flex-shrink-0 font-semibold">
                Inetum Sanidad
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* SIMULADOR DE INTEROPERABILIDAD HL7 / MIRTH CONNECT */}
      <section id="interoperabilidad" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Demostración de Interoperabilidad Sanitaria</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flujo de Mensajería <span className="text-sky-400">HL7 & Mirth Connect</span>
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Demostración interactiva de cómo orquesto los flujos de mensajería estándar entre la Historia Clínica Casiopea y los subsistemas hospitalarios.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Evento HL7:</span>
                <div className="flex items-center gap-1.5">
                  {(['ADT', 'ORM', 'ORU', 'MDM'] as const).map((eventType) => (
                    <button
                      key={eventType}
                      onClick={() => {
                        setSelectedHl7Event(eventType);
                        setSimStep(0);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                        selectedHl7Event === eventType
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {eventType}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={runHl7Simulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs shadow transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Transmitiendo Paquete...' : 'Ejecutar Simulación de Flujo'}</span>
              </button>
            </div>

            {/* Architecture Node Flow Diagram */}
            <div className="p-6 sm:p-8 bg-slate-950/70 border-b border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Node 1: Casiopea EHR */}
                <div
                  className={`p-5 rounded-xl border text-center transition-all ${
                    simStep === 1
                      ? 'bg-slate-900 border-sky-400 shadow-md ring-1 ring-sky-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center mb-2">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Casiopea (EHR Core)</h4>
                  <p className="text-xs text-slate-400 mt-1">Estación Asistencial / Emisor</p>
                  <div className="mt-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        simStep >= 1 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {simStep >= 1 ? 'Emisión OK' : 'En Espera'}
                    </span>
                  </div>
                </div>

                {/* Node 2: Mirth ESB Router */}
                <div
                  className={`p-5 rounded-xl border text-center transition-all ${
                    simStep === 2
                      ? 'bg-slate-900 border-sky-400 shadow-md ring-1 ring-sky-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center mb-2">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Mirth Connect ESB</h4>
                  <p className="text-xs text-slate-400 mt-1">Transformador & Filtros HL7</p>
                  <div className="mt-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        simStep >= 2 ? 'bg-sky-950 text-sky-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {simStep === 2 ? 'Mapeando Segmentos...' : simStep > 2 ? 'Enrutado Exitoso' : 'En Espera'}
                    </span>
                  </div>
                </div>

                {/* Node 3: Departmental Subsystem */}
                <div
                  className={`p-5 rounded-xl border text-center transition-all ${
                    simStep >= 3
                      ? 'bg-slate-900 border-emerald-400 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-2">
                    <Server className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Subsistema Destino</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedHl7Event === 'ADT'
                      ? 'RIS, ATLAS, SGLAC, Portal'
                      : selectedHl7Event === 'ORM'
                      ? 'SGLAC (Laboratorio Clínico)'
                      : selectedHl7Event === 'ORU'
                      ? 'Casiopea & Portal Paciente'
                      : 'RIS/PACS (Radiología)'}
                  </p>
                  <div className="mt-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        simStep >= 3 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {simStep >= 3 ? 'ACK Recibido (AA)' : 'En Espera'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* HL7 Message Inspector */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Mensaje HL7 v2.5 ({selectedHl7Event})</span>
                  <button
                    onClick={() => handleCopy(hl7Samples[selectedHl7Event].raw, 'Trama HL7 copiada')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Trama</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
                  <pre>{hl7Samples[selectedHl7Event].raw}</pre>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-1">{hl7Samples[selectedHl7Event].name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{hl7Samples[selectedHl7Event].description}</p>
                  
                  <div className="text-xs space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Análisis Funcional:
                    </span>
                    {hl7Samples[selectedHl7Event].explanation.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-sky-400 font-bold">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-slate-100">Interlocución Funcional:</span> Parametrización de canales, normalización de terminologías clínicas (LOINC / CIE-10) y validación de interoperabilidad end-to-end.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FORMACIÓN ACADÉMICA */}
      <section id="educacion" className="py-20 bg-slate-900/60 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Base Formativa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Formación <span className="text-sky-400">Académica</span>
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Fundamentos sólidos en ingeniería del software, desarrollo multiplataforma y orientación científica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Degree 1: DAM */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sky-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    2018 – 2020
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</h3>
                <p className="text-sm text-sky-400 font-medium mt-1">Colegio Santa María de los Apóstoles</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Desarrollo integral de software, modelado de bases de datos relacionales, programación concurrente y aplicaciones cliente-servidor.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Java</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">SQL Server</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Multiplataforma</span>
              </div>
            </div>

            {/* Degree 2: UPM Software Engineering */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sky-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    2017 – 2018
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Ingeniería del Software</h3>
                <p className="text-sm text-sky-400 font-medium mt-1">Universidad Politécnica de Madrid (UPM)</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Formación universitaria inicial en fundamentos matemáticos, algoritmia avanzada en C++, estructura de computadores y metodología formal de ingeniería.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">C++</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Algoritmia</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">UPM</span>
              </div>
            </div>

            {/* Degree 3: Bachillerato Ciencias y Salud */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sky-400">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    2014 – 2017
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Bachillerato (Ciencias y Salud)</h3>
                <p className="text-sm text-sky-400 font-medium mt-1">Colegio Vedruna de Carabanchel</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Orientación científico-sanitaria que aportó una temprana vocación e intuición por la terminología de salud, biología celular y ciencias aplicadas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Ciencias</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Salud</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">Biología</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACTO EJECUTIVO DIRECTO (Sin formulario, canales directos y elegantes) */}
      <section id="contacto" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Conexión Directa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Información de <span className="text-sky-400">Contacto Profesional</span>
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              A disposición inmediata para proyectos de consultoría funcional, arranques hospitalarios e interoperabilidad de sistemas de salud.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            
            {/* Grid of Direct Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Phone & WhatsApp */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-sky-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Llamadas & WhatsApp
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">Teléfono Móvil</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-4">Contacto telefónico directo o mensajería rápida.</p>
                  <p className="text-xl font-bold text-white font-mono">+34 665 79 71 89</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href="tel:+34665797189"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs text-center transition-colors"
                  >
                    Llamar
                  </a>
                  <a
                    href="https://wa.me/34665797189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs text-center transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => handleCopy('+34 665 79 71 89', 'Teléfono copiado: +34 665 79 71 89')}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copiar número"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-sky-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                      Correo Prioritario
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">Correo Electrónico</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-4">Para propuestas formales, especificaciones o reuniones.</p>
                  <p className="text-base sm:text-lg font-bold text-white break-all">junior_98_cortez@outlook.es</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href="mailto:junior_98_cortez@outlook.es?subject=Contacto%20Profesional%20-%20Sistemas%20Sanitarios"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs text-center transition-colors"
                  >
                    Redactar Correo
                  </a>
                  <button
                    onClick={() => handleCopy('junior_98_cortez@outlook.es', 'Email copiado: junior_98_cortez@outlook.es')}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copiar correo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* LinkedIn Official */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-sky-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      Red Profesional
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">LinkedIn</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-3">Conexión profesional, trayectoria completa y recomendaciones.</p>
                  <p className="text-sm font-medium text-slate-200">junior-alexander-cortez-garcia</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="https://www.linkedin.com/in/junior-alexander-cortez-garcia-b8726a150"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <span>Abrir Perfil en LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Location & vCard */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-sky-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Madrid, España
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">Disponibilidad Geográfica</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-3">
                    Residencia en Madrid. Disponibilidad para desplazamientos a centros hospitalarios e implantaciones in-situ.
                  </p>
                  <p className="text-sm font-medium text-slate-200">Modalidad Presencial / Híbrida</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={downloadVCard}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span>Guardar Tarjeta de Contacto (.vcf)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 relative z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs">
              JC
            </div>
            <div>
              <p className="font-semibold text-slate-200">Junior A. Cortez García</p>
              <p className="text-[11px] text-slate-500">Consultor Funcional de Sistemas Sanitarios & HL7</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
            <a href="#evolucion" className="hover:text-white transition-colors">Evolución</a>
            <a href="#ecosistema" className="hover:text-white transition-colors">Ecosistema</a>
            <a href="#hitos" className="hover:text-white transition-colors">Hitos</a>
            <a
              href="https://www.linkedin.com/in/junior-alexander-cortez-garcia-b8726a150"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <p className="text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} Junior A. Cortez García. Todos los derechos reservados.
          </p>

        </div>
      </footer>
    </div>
  );
}

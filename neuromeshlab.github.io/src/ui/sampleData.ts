export const sample = {
  slides: [
    { type: 'image', src: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1600&auto=format&fit=crop', alt: 'Brain MRI axial' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1581091014534-6df3b3a5a8f2?q=80&w=1600&auto=format&fit=crop', alt: 'EEG cap' },
    { type: 'video', src: 'https://neuro.gatech.edu/sites/default/files/2023-10/Neuro%20Next%20Initiative%20homepage%20animation.mp4' }
  ],
  projects: [
    { title: 'Connectome Fingerprinting in fMRI', summary: 'Identifying individuals via functional connectivity matrices.' },
    { title: 'DTI Tractography Atlas', summary: 'White matter pathways mapping for primate models.' },
    { title: 'EEG Cognitive Load Estimation', summary: 'Estimating workload via oscillatory power features.' },
    { title: 'Eye-tracking in Visual Search', summary: 'Scanpath analysis under noisy stimuli conditions.' },
    { title: 'MRI Quality Control Automation', summary: 'Automated artifact detection and reporting.' }
  ],
  team: [
    { name: 'Neda Mohammadi', role: 'Neuroscientist' },
    { name: 'Mohammad Nili', role: 'Cognitive Neuroscientist' },
    { name: 'B. Engineer', role: 'Neuroimaging Engineer' }
  ],
  publications: [
    { title: 'Graph-theoretic insights into brain connectivity', citation: 'Authors, Journal, 2024' },
    { title: 'EEG indicators of sustained attention', citation: 'Authors, Conference, 2023' },
    { title: 'DTI tract integrity in NHP models', citation: 'Authors, Journal, 2022' }
  ],
  services: [
    { name: 'fMRI/MRI/DTI Analysis', desc: 'Preprocessing, QC, connectivity, tractography, statistics.', detail: 'End-to-end pipelines with motion correction, susceptibility distortion correction, registration, and advanced connectivity analysis (static and dynamic). Deliverables include reports and visualizations.', media: [ {type:'image', src:'https://images.unsplash.com/photo-1581092580491-34c0b3af1cf8?q=80&w=1200&auto=format&fit=crop'} ] },
    { name: 'EEG Analytics', desc: 'Filtering, ICA, time-frequency, source estimation.', detail: 'Artifact removal (ICA/SSP), ERPs, time-frequency decompositions (Morlet/Multitaper), connectivity (PLI/PLV/coherence), and source modeling.', media: [ {type:'image', src:'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop'} ] },
    { name: 'Eye-tracking Studies', desc: 'Design, calibration, gaze analysis, scanpaths.', detail: 'High-frequency gaze tracking, AOI analyses, scanpath metrics (Levenshtein/String-edit), and pupil-based arousal modeling.', media: [ {type:'image', src:'https://images.unsplash.com/photo-1512015452243-8f38f7f1f80b?q=80&w=1200&auto=format&fit=crop'} ] },
    { name: 'Task Design', desc: 'Cognitive/behavioral task design for human and NHP.', detail: 'Custom stimulus pipelines, staircase procedures, reward schedules, and cross-species task adaptations with precise timing.', media: [ {type:'image', src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop'} ] }
  ]
};



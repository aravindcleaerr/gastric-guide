var CACHE = 'gutwise-v1';
var PAGES = [
  './', 'styles.css', 'favicon.svg', 'lang.js',
  // English pages
  'index.html',
  'digestive-system-overview.html','how-digestion-works.html','gut-microbiome.html','gut-brain-connection.html',
  'digestive-enzymes.html','common-symptoms.html',
  'gerd-acid-reflux.html','heartburn.html','silent-reflux.html','hiatal-hernia.html','barretts-esophagus.html',
  'gastritis.html','peptic-ulcer.html','h-pylori.html','gastroparesis.html','stomach-cancer-awareness.html',
  'ibs.html','ibd-overview.html','crohns-disease.html','ulcerative-colitis.html',
  'celiac-disease.html','diverticular-disease.html','sibo.html','leaky-gut.html',
  'bloating-gas.html','constipation.html','diarrhea.html','nausea-vomiting.html',
  'indigestion.html','abdominal-pain.html','food-intolerance.html','lactose-intolerance.html',
  'fatty-liver.html','gallstones.html','liver-health.html','hepatitis-awareness.html',
  'pancreatitis.html','pancreatic-health.html',
  'gut-healthy-diet.html','indian-diet-gut.html','fodmap-diet.html','anti-inflammatory-diet.html',
  'fiber-guide.html','probiotics-prebiotics.html','foods-to-avoid.html','gut-friendly-recipes.html','hydration-gut.html',
  'stress-digestion.html','sleep-gut-health.html','exercise-digestion.html',
  'eating-habits.html','weight-gut-health.html','smoking-alcohol-gut.html',
  'antacids-ppis.html','gi-medications.html','natural-remedies.html','ayurvedic-treatments.html','surgical-options.html',
  'gi-tests-overview.html','endoscopy-colonoscopy.html','breath-tests.html','stool-tests.html','imaging-tests.html',
  'gi-emergencies.html','gi-bleeding.html','severe-dehydration.html','food-poisoning.html','bowel-obstruction.html',
  'children-digestive.html','pregnancy-digestion.html','elderly-gut-health.html','athletes-digestion.html',
  'anxiety-gut.html','depression-gut.html','mindful-eating.html',
  'travel-digestive.html','workplace-gut.html','fasting-gut.html','seasonal-gut.html',
  'doctor-communication.html','symptom-diary.html','india-gi-resources.html',
  'myths-facts.html','gi-glossary.html','video-references.html','resources.html','terms-of-use.html',
  // Kannada pages
  'index-kn.html',
  'digestive-system-overview-kn.html','how-digestion-works-kn.html','gut-microbiome-kn.html','gut-brain-connection-kn.html',
  'digestive-enzymes-kn.html','common-symptoms-kn.html',
  'gerd-acid-reflux-kn.html','heartburn-kn.html','silent-reflux-kn.html','hiatal-hernia-kn.html','barretts-esophagus-kn.html',
  'gastritis-kn.html','peptic-ulcer-kn.html','h-pylori-kn.html','gastroparesis-kn.html','stomach-cancer-awareness-kn.html',
  'ibs-kn.html','ibd-overview-kn.html','crohns-disease-kn.html','ulcerative-colitis-kn.html',
  'celiac-disease-kn.html','diverticular-disease-kn.html','sibo-kn.html','leaky-gut-kn.html',
  'bloating-gas-kn.html','constipation-kn.html','diarrhea-kn.html','nausea-vomiting-kn.html',
  'indigestion-kn.html','abdominal-pain-kn.html','food-intolerance-kn.html','lactose-intolerance-kn.html',
  'fatty-liver-kn.html','gallstones-kn.html','liver-health-kn.html','hepatitis-awareness-kn.html',
  'pancreatitis-kn.html','pancreatic-health-kn.html',
  'gut-healthy-diet-kn.html','indian-diet-gut-kn.html','fodmap-diet-kn.html','anti-inflammatory-diet-kn.html',
  'fiber-guide-kn.html','probiotics-prebiotics-kn.html','foods-to-avoid-kn.html','gut-friendly-recipes-kn.html','hydration-gut-kn.html',
  'stress-digestion-kn.html','sleep-gut-health-kn.html','exercise-digestion-kn.html',
  'eating-habits-kn.html','weight-gut-health-kn.html','smoking-alcohol-gut-kn.html',
  'antacids-ppis-kn.html','gi-medications-kn.html','natural-remedies-kn.html','ayurvedic-treatments-kn.html','surgical-options-kn.html',
  'gi-tests-overview-kn.html','endoscopy-colonoscopy-kn.html','breath-tests-kn.html','stool-tests-kn.html','imaging-tests-kn.html',
  'gi-emergencies-kn.html','gi-bleeding-kn.html','severe-dehydration-kn.html','food-poisoning-kn.html','bowel-obstruction-kn.html',
  'children-digestive-kn.html','pregnancy-digestion-kn.html','elderly-gut-health-kn.html','athletes-digestion-kn.html',
  'anxiety-gut-kn.html','depression-gut-kn.html','mindful-eating-kn.html',
  'travel-digestive-kn.html','workplace-gut-kn.html','fasting-gut-kn.html','seasonal-gut-kn.html',
  'doctor-communication-kn.html','symptom-diary-kn.html','india-gi-resources-kn.html',
  'myths-facts-kn.html','gi-glossary-kn.html','video-references-kn.html','resources-kn.html','terms-of-use-kn.html'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(cache) { return cache.addAll(PAGES); }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(names) {
    return Promise.all(names.filter(function(n) { return n !== CACHE; }).map(function(n) { return caches.delete(n); }));
  }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).then(function(resp) {
      var clone = resp.clone();
      caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
      return resp;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});

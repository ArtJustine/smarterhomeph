// Catalogue shown on /devices. Shared with the page and its structured data.
export const sampleDevices = [
  {
    id: 1,
    name: "Smart Thermostat Pro",
    description: "Control your home temperature and monitor air quality from anywhere.",
    price: 129.99,
    brand: "Ecobee",
    category: "Climate",
    ecosystems: ["HomeKit", "Alexa", "Google Home"],
    image: "https://images.unsplash.com/photo-1595814433015-e6f548d5120a?q=80&w=600&auto=format&fit=crop",
    specs: [
      "Circadian temperature adaptation",
      "Built-in indoor air quality monitor",
      "Saves up to 23% on heating & cooling",
      "Smart sensor occupancy tracking"
    ]
  },
  {
    id: 2,
    name: "Security Camera 2K",
    description: "Ultra-sharp HD security camera with smart AI notifications and zero cloud fees.",
    price: 89.99,
    brand: "Reolink",
    category: "Security",
    ecosystems: ["Alexa", "Google Home"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop",
    specs: [
      "2K Super HD recording resolution",
      "Smart human/vehicle detection alerts",
      "Full-color infrared night vision",
      "Supports local micro SD storage (up to 256GB)"
    ]
  },
  {
    id: 3,
    name: "Smart Light Bulb E26",
    description: "Multicolor dimmable LED bulb supporting seamless scene synchronization.",
    price: 24.99,
    brand: "Philips",
    category: "Lighting",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "https://images.unsplash.com/photo-1550524514-9b50228b3a7b?q=80&w=600&auto=format&fit=crop",
    specs: [
      "16 million colors + warm to cool whites",
      "Instant response over Zigbee or Bluetooth",
      "Circadian sync automatic sleep schedules",
      "Voice control compatibility out of the box"
    ]
  },
  {
    id: 4,
    name: "Smart Lock Pro",
    description: "Keyless deadbolt replacement supporting biometric fingerprint access.",
    price: 199.99,
    brand: "August",
    category: "Security",
    ecosystems: ["HomeKit", "Alexa"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
    specs: [
      "Biometric fingerprint scanner storage",
      "Auto-unlocks as you approach the door",
      "Bank-level 256-bit AES encryption",
      "Log history tracking door status"
    ]
  },
  {
    id: 5,
    name: "Aesthetic Motion Sensor",
    description: "Micro automation sensor to trigger scenes and alert system changes.",
    price: 39.99,
    brand: "Aqara",
    category: "Sensors",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "https://images.unsplash.com/photo-1626244278553-0870992a1294?q=80&w=600&auto=format&fit=crop",
    specs: [
      "Sub-second latency motion triggering",
      "Built-in light sensor for illumination rules",
      "Up to 5 years battery life on CR2450",
      "Multi-directional mounting brackets"
    ]
  },
  {
    id: 6,
    name: "Smart Plug Mini",
    description: "Compact smart outlet with detailed energy monitoring indicators.",
    price: 19.99,
    brand: "TP-Link",
    category: "Power",
    ecosystems: ["Alexa", "Google Home"],
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop",
    specs: [
      "Ultra-compact plug blocks no adjacent outlets",
      "Real-time energy consumption statistics",
      "Away mode simulates presence automatically",
      "Supports voice commands and schedules"
    ]
  },
]

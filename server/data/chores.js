// Chore definitions with weights (point values based on effort/involvement)
// Higher weight = more involved/difficult chore

export const CHORES = [
  // Cooking & Kitchen (higher weights - more time/effort)
  { id: 'cook_meal', name: 'Cook a meal', weight: 5 },
  { id: 'meal_prep', name: 'Meal prep', weight: 6 },
  { id: 'bake', name: 'Bake something', weight: 4 },

  // Kitchen Cleaning (medium weights)
  { id: 'wash_dishes', name: 'Wash dishes', weight: 2 },
  { id: 'load_dishwasher', name: 'Load dishwasher', weight: 1 },
  { id: 'empty_dishwasher', name: 'Empty dishwasher', weight: 1 },
  { id: 'clean_kitchen', name: 'Clean kitchen', weight: 3 },
  { id: 'wipe_counters', name: 'Wipe counters', weight: 1 },
  { id: 'clean_stovetop', name: 'Clean stovetop', weight: 2 },

  // Laundry (medium weights)
  { id: 'do_laundry', name: 'Do laundry (wash & dry)', weight: 2 },
  { id: 'fold_laundry', name: 'Fold laundry', weight: 2 },
  { id: 'put_away_laundry', name: 'Put away laundry', weight: 1 },
  { id: 'iron_clothes', name: 'Iron clothes', weight: 2 },

  // Cleaning (various weights)
  { id: 'vacuum', name: 'Vacuum', weight: 3 },
  { id: 'mop_floors', name: 'Mop floors', weight: 3 },
  { id: 'dust', name: 'Dust surfaces', weight: 2 },
  { id: 'clean_bathroom', name: 'Clean bathroom', weight: 4 },
  { id: 'clean_toilet', name: 'Clean toilet', weight: 2 },
  { id: 'make_bed', name: 'Make bed', weight: 1 },
  { id: 'change_sheets', name: 'Change bed sheets', weight: 2 },
  { id: 'tidy_room', name: 'Tidy up room', weight: 2 },

  // Trash & Recycling
  { id: 'take_out_trash', name: 'Take out trash', weight: 1 },
  { id: 'take_out_recycling', name: 'Take out recycling', weight: 1 },
  { id: 'replace_trash_bag', name: 'Replace trash bag', weight: 1 },

  // Shopping & Errands (higher weights)
  { id: 'grocery_shopping', name: 'Grocery shopping', weight: 4 },
  { id: 'run_errands', name: 'Run errands', weight: 3 },

  // Pet Care (if applicable)
  { id: 'feed_pet', name: 'Feed pet', weight: 1 },
  { id: 'walk_dog', name: 'Walk dog', weight: 2 },
  { id: 'clean_litter', name: 'Clean litter box', weight: 2 },

  // Miscellaneous
  { id: 'water_plants', name: 'Water plants', weight: 1 },
  { id: 'take_care_of_mail', name: 'Handle mail', weight: 1 },
  { id: 'organize_space', name: 'Organize a space', weight: 3 },
  { id: 'deep_clean', name: 'Deep clean an area', weight: 5 },
]

// User definitions
export const USERS = [
  { id: 1, name: 'Ron' },
  { id: 2, name: 'Lauren' },
]

// Helper to get chore by ID
export const getChoreById = (choreId) => {
  return CHORES.find((c) => c.id === choreId)
}

// Helper to get user by ID
export const getUserById = (userId) => {
  return USERS.find((u) => u.id === userId)
}

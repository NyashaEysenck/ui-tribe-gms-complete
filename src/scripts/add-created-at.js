// add-created-at.js
import { createClient } from '@supabase/supabase-js';

// New Supabase credentials
const SUPABASE_URL = "https://qbrhdliwwlxjkqgjjmsf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFicmhkbGl3d2x4amtxZ2pqbXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzkxODEsImV4cCI6MjA2MjYxNTE4MX0.dV0LynrdFby4dVHhdbNN75zlQG2xauVE2kLKu6CObRU";

console.log('Initializing Supabase client...');

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('Supabase client initialized!');

async function addCreatedAtColumn() {
  try {
    console.log('Adding created_at column to grants table...');
    
    // First, let's check if the column already exists
    try {
      const { data, error } = await supabase
        .from('grants')
        .select('created_at')
        .limit(1);
      
      if (!error) {
        console.log('The created_at column already exists!');
        return;
      }
    } catch (error) {
      console.log('The created_at column does not exist. Adding it now...');
    }
    
    // Add the created_at column with a default value of now()
    const alterTableQuery = `
      ALTER TABLE grants
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    `;
    
    // Since we can't run SQL directly, we need to use the Supabase dashboard
    console.log('Please run the following SQL in your Supabase SQL Editor:');
    console.log(alterTableQuery);
    
    // Update existing grants to have a created_at value
    const { data: grants } = await supabase.from('grants').select('id');
    
    if (grants && grants.length > 0) {
      console.log(`Updating ${grants.length} existing grants with created_at timestamp...`);
      
      for (const grant of grants) {
        const { error } = await supabase
          .from('grants')
          .update({ created_at: new Date().toISOString() })
          .eq('id', grant.id);
        
        if (error) {
          console.error(`Error updating grant ${grant.id}:`, error);
        } else {
          console.log(`Successfully updated grant ${grant.id}`);
        }
      }
    }
    
    console.log('Process completed!');
  } catch (error) {
    console.error('Error adding created_at column:', error);
  }
}

// Execute the function
console.log('Script started!');
addCreatedAtColumn().catch(error => {
  console.error('Unhandled error:', error);
});

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vovmqyrnvoohhjvftulo.supabase.co'
const supabaseAnonKey = 'sb_publishable_tHRM7E7ky-U0TryfJIVbsw_sJ6eOoxd'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runTest() {
  console.log("🧪 Testing Supabase Connection...")
  
  // 1. Test Querying Groups
  const { data, error } = await supabase.from('groups').select('id').limit(1)
  if (error) {
    console.error("❌ Schema Test Failed!", error.message)
    return
  }
  console.log("✅ Schema Test Passed: 'groups' table exists.")

  // 2. Test User Signup (Trigger will create the profile automatically)
  const testEmail = `splitsmart_tester_${Date.now()}@gmail.com`
  console.log(`\n👤 Attempting to sign up test user: ${testEmail}`)
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: 'Password123!',
    options: {
      data: {
        full_name: 'Trigger Test User'
      }
    }
  })

  if (authError) {
    console.error("❌ Signup Failed:", authError.message)
    return
  }
  console.log("✅ Signup Passed. User Auth ID:", authData.user?.id)

  // 3. Verify Trigger execution
  console.log("\n📝 Verifying that Postgres Trigger created the Profile...")
  
  await new Promise(r => setTimeout(r, 1000))

  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user?.id)
    .single()

  if (profileError || !profileData) {
    console.error("❌ Profile Retrieval Failed (Trigger might not be setup):", profileError?.message || "Missing Data")
  } else {
    console.log(`✅ Trigger Passed! Profile automatically created with Unique ID: ${profileData.public_user_id}`)
  }
  
  console.log("\n🎉 All End-To-End Backend Tests Completed!")
}

runTest()

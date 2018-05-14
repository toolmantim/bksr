load "/usr/local/lib/bats/load.bash"

# If there are test failures, uncomment this out to enable more debugging output
# from the app
# export DEBUG='*'

@test "bksr --all" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --all
  
  assert_output --partial "Running 3 steps"
  assert_output --partial "This is a command step"
  assert_output --partial "This is a multi-command (1)"
  assert_output --partial "This is a multi-command (2)"
  assert_output --partial "Searching for Clowns"
  assert_success
}

@test "bksr --all (failing step)" {
  run bin/bksr.js --pipeline test/pipeline.failing-step.yml --all
  
  assert_output --partial "'A failing step' failed with exit code 1"
  assert_failure
}

@test "bksr --checkout" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --all --checkout
  
  assert_output --partial "Running 3 steps"
  assert_output --partial "git clone"
  assert_output --partial "This is a command step"
  assert_output --partial "This is a multi-command (1)"
  assert_output --partial "This is a multi-command (2)"
  assert_output --partial "Searching for Clowns"
  assert_success
}

@test "bksr --step" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --step ':clown:'
  
  assert_output --partial "Running 1 step"
  assert_output --partial "Searching for Clowns"
  assert_success
}

@test "bksr --step (step without a label)" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --step "echo 'This is a command step'"
  
  assert_output --partial "Running 1 step"
  assert_output --partial "This is a command step"
  assert_success
}

@test "bksr --branch" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --branch master
  
  assert_output --partial "Running 1 step"
  assert_output --partial "This is a master branch command step"
  assert_success
}

@test "bksr --branch (no matching steps)" {
  run bin/bksr.js --pipeline test/pipeline.kitchensink.yml --branch invalid
  
  assert_output --partial "Running 0 steps"
  assert_success
}

@test "bksr --pipeline (stdin)" {
  # Needs bash -c because of the pipe
  run bash -c "cat test/pipeline.kitchensink.yml | bin/bksr.js --pipeline '-' --all"
  
  assert_output --partial "Running 3 steps"
  assert_output --partial "This is a command step"
  assert_output --partial "This is a multi-command (1)"
  assert_output --partial "This is a multi-command (2)"
  assert_output --partial "Searching for Clowns"
  assert_success
}

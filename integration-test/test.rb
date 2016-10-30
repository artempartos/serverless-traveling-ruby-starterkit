#!/usr/bin/ruby

expected = File.read(__dir__ + '/expected_output')
actual = %x(serverless run -f hello)

puts '------expected output------'
puts expected
puts '------actual output------'
puts actual

if expected == actual
  'test success!'
  exit 0
else
  'test failed!'
  exit 1
end

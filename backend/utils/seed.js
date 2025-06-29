const mongoose = require('mongoose');
const Problem = require('../models/Problem');
require('dotenv').config();

const problems = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    tags: ['Array', 'HashMap']
  },
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    input: 's = "()[]{}"',
    output: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only.'
    ],
    tags: ['Stack', 'String']
  },
  {
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list and return its head.',
    input: 'head = [1,2,3,4,5]',
    output: '[5,4,3,2,1]',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    tags: ['Linked List', 'Recursion']
  },
  {
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists and return it as a new sorted list.',
    input: 'l1 = [1,2,4], l2 = [1,3,4]',
    output: '[1,1,2,3,4,4]',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100'
    ],
    tags: ['Linked List']
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description: 'Given an array prices where prices[i] is the price of a stock on the i-th day, return the maximum profit.',
    input: 'prices = [7,1,5,3,6,4]',
    output: '5',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    tags: ['Array', 'Dynamic Programming']
  },
  {
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    input: 's = "anagram", t = "nagaram"',
    output: 'true',
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    tags: ['HashMap', 'String']
  },
  {
    title: 'Binary Search',
    description: 'Given a sorted array of integers and a target value, return the index if the target is found. Otherwise, return -1.',
    input: 'nums = [-1,0,3,5,9,12], target = 9',
    output: '4',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.'
    ],
    tags: ['Binary Search']
  },
  {
    title: 'Flood Fill',
    description: 'Perform a flood fill algorithm starting from a given pixel.',
    input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2',
    output: '[[2,2,2],[2,2,0],[2,0,1]]',
    constraints: [
      'm == image.length',
      'n == image[i].length',
      '1 <= m, n <= 50'
    ],
    tags: ['DFS', 'BFS', 'Matrix']
  },
  {
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray with the largest sum.',
    input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
    output: '6',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    tags: ['Dynamic Programming']
  },
  {
    title: 'Climbing Stairs',
    description: 'Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    input: 'n = 3',
    output: '3',
    constraints: [
      '1 <= n <= 45'
    ],
    tags: ['Dynamic Programming']
  },
  {
    title: 'Palindrome Number',
    description: 'Determine whether an integer is a palindrome.',
    input: 'x = 121',
    output: 'true',
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    tags: ['Math']
  },
  {
    title: 'Roman to Integer',
    description: 'Convert a roman numeral to an integer.',
    input: 's = "III"',
    output: '3',
    constraints: [
      '1 <= s.length <= 15',
      's contains only Roman numerals'
    ],
    tags: ['String', 'Math']
  },
  {
    title: 'Length of Last Word',
    description: 'Given a string s consisting of words and spaces, return the length of the last word in the string.',
    input: 's = "Hello World"',
    output: '5',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of only English letters and spaces.'
    ],
    tags: ['String']
  },
  {
    title: 'Plus One',
    description: 'Given a non-empty array of digits representing a non-negative integer, increment one to the integer.',
    input: 'digits = [1,2,3]',
    output: '[1,2,4]',
    constraints: [
      '1 <= digits.length <= 100',
      '0 <= digits[i] <= 9'
    ],
    tags: ['Array']
  },
  {
    title: 'Add Binary',
    description: 'Given two binary strings a and b, return their sum as a binary string.',
    input: 'a = "11", b = "1"',
    output: '"100"',
    constraints: [
      '1 <= a.length, b.length <= 10^4',
      'a and b consist only of 0 or 1 characters.'
    ],
    tags: ['Binary', 'Math']
  },
  {
    title: 'Count and Say',
    description: 'Given an integer n, generate the nth term of the count-and-say sequence.',
    input: 'n = 4',
    output: '"1211"',
    constraints: [
      '1 <= n <= 30'
    ],
    tags: ['String']
  },
  {
    title: 'Sqrt(x)',
    description: 'Compute and return the square root of x, rounded down.',
    input: 'x = 8',
    output: '2',
    constraints: [
      '0 <= x <= 2^31 - 1'
    ],
    tags: ['Binary Search']
  },
  {
    title: 'Guess Number Higher or Lower',
    description: 'Given an API guess(int num), return the number you picked.',
    input: 'n = 10, pick = 6',
    output: '6',
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    tags: ['Binary Search']
  },
  {
    title: 'First Bad Version',
    description: 'Find the first bad version given an API isBadVersion(version).',
    input: 'n = 5, bad = 4',
    output: '4',
    constraints: [
      '1 <= bad <= n <= 2^31 - 1'
    ],
    tags: ['Binary Search']
  },
  {
    title: 'Missing Number',
    description: 'Given an array containing n distinct numbers in the range [0, n], return the missing number.',
    input: 'nums = [3,0,1]',
    output: '2',
    constraints: [
      'n == nums.length',
      '0 <= nums[i] <= n'
    ],
    tags: ['Math', 'Array']
  }
];

// Utility to generate URL-friendly slug
const slugify = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected!');

    await Problem.deleteMany({});
    console.log('Cleared existing problems.');

    const problemsWithSlug = problems.map(p => ({
      ...p,
      slug: slugify(p.title)
    }));

    await Problem.insertMany(problemsWithSlug);
    console.log('Seeded problems!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();

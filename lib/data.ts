// In-memory data store for the bookstore

export interface Product {
  id: number
  source_id: string
  title: string
  price: number
  currency: string
  image_url: string
  source_url: string
  last_scraped_at: string
}

export interface ProductDetail {
  product_id: number
  description: string
  specs: {
    author: string
    isbn: string
    pages: number
    publisher: string
    language: string
    published_date: string
  }
  ratings_avg: number
  reviews_count: number
}

export interface Review {
  id: number
  product_id: number
  author: string
  rating: number
  text: string
  created_at: string
}

export interface Category {
  id: number
  navigation_id: number
  parent_id: number | null
  title: string
  slug: string
  product_count: number
  last_scraped_at: string
}

export interface Navigation {
  id: number
  title: string
  slug: string
  last_scraped_at: string
}

export interface ScrapeJob {
  id: number
  target_url: string
  target_type: string
  status: "pending" | "running" | "completed" | "failed"
  started_at: string
  finished_at: string | null
  error_log: string | null
}

export interface ViewHistory {
  id: number
  user_id: string | null
  session_id: string
  path_json: string
  created_at: string
}

// Mock data
export const products: Product[] = [
  // Fiction Category Books (IDs 1-10)
  {
    id: 1,
    source_id: "WOB001",
    title: "To Kill a Mockingbird",
    price: 3.99, // Updated to World of Books pricing (£2-10 range)
    currency: "GBP",
    image_url: "/to-kill-a-mockingbird-cover.png",
    source_url: "https://worldofbooks.com/to-kill-a-mockingbird",
    last_scraped_at: "2026-01-07T10:30:00Z",
  },
  {
    id: 2,
    source_id: "WOB002",
    title: "1984",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/1984-book-cover.png",
    source_url: "https://worldofbooks.com/1984",
    last_scraped_at: "2026-01-07T10:31:00Z",
  },
  {
    id: 3,
    source_id: "WOB003",
    title: "Pride and Prejudice",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/pride-and-prejudice-cover.png",
    source_url: "https://worldofbooks.com/pride-and-prejudice",
    last_scraped_at: "2026-01-07T10:32:00Z",
  },
  {
    id: 4,
    source_id: "WOB004",
    title: "The Great Gatsby",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/great-gatsby-book-cover.png",
    source_url: "https://worldofbooks.com/the-great-gatsby",
    last_scraped_at: "2026-01-07T10:33:00Z",
  },
  {
    id: 5,
    source_id: "WOB005",
    title: "The Catcher in the Rye",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/catcher-in-the-rye-cover.jpg",
    source_url: "https://worldofbooks.com/catcher-in-the-rye",
    last_scraped_at: "2026-01-07T10:34:00Z",
  },
  {
    id: 6,
    source_id: "WOB006",
    title: "Brave New World",
    price: 3.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/brave-new-world-book-cover.jpg",
    source_url: "https://worldofbooks.com/brave-new-world",
    last_scraped_at: "2026-01-07T10:35:00Z",
  },
  {
    id: 7,
    source_id: "WOB007",
    title: "Lord of the Flies",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/lord-of-the-flies-cover.png",
    source_url: "https://worldofbooks.com/lord-of-flies",
    last_scraped_at: "2026-01-07T10:36:00Z",
  },
  {
    id: 8,
    source_id: "WOB008",
    title: "Of Mice and Men",
    price: 2.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/of-mice-and-men-book-cover.jpg",
    source_url: "https://worldofbooks.com/of-mice-and-men",
    last_scraped_at: "2026-01-07T10:37:00Z",
  },
  {
    id: 9,
    source_id: "WOB009",
    title: "The Bell Jar",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-bell-jar-book-cover.jpg",
    source_url: "https://worldofbooks.com/bell-jar",
    last_scraped_at: "2026-01-07T10:38:00Z",
  },
  {
    id: 10,
    source_id: "WOB010",
    title: "Slaughterhouse-Five",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/slaughterhouse-five-book-cover.jpg",
    source_url: "https://worldofbooks.com/slaughterhouse-five",
    last_scraped_at: "2026-01-07T10:39:00Z",
  },

  // Fantasy Category Books (IDs 11-18)
  {
    id: 11,
    source_id: "WOB011",
    title: "Harry Potter and the Sorcerer's Stone",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/sorcerers-stone-cover.png",
    source_url: "https://worldofbooks.com/harry-potter-1",
    last_scraped_at: "2026-01-07T10:40:00Z",
  },
  {
    id: 12,
    source_id: "WOB012",
    title: "The Hobbit",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/hobbit-book-cover.png",
    source_url: "https://worldofbooks.com/the-hobbit",
    last_scraped_at: "2026-01-07T10:41:00Z",
  },
  {
    id: 13,
    source_id: "WOB013",
    title: "The Lord of the Rings",
    price: 8.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-lord-of-the-rings-book-cover.jpg",
    source_url: "https://worldofbooks.com/lotr",
    last_scraped_at: "2026-01-07T10:42:00Z",
  },
  {
    id: 14,
    source_id: "WOB014",
    title: "The Chronicles of Narnia",
    price: 7.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/chronicles-of-narnia-book-cover.jpg",
    source_url: "https://worldofbooks.com/narnia",
    last_scraped_at: "2026-01-07T10:43:00Z",
  },
  {
    id: 15,
    source_id: "WOB015",
    title: "A Game of Thrones",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/game-of-thrones-book-cover.jpg",
    source_url: "https://worldofbooks.com/game-of-thrones",
    last_scraped_at: "2026-01-07T10:44:00Z",
  },
  {
    id: 16,
    source_id: "WOB016",
    title: "The Name of the Wind",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-name-of-the-wind-book-cover.jpg",
    source_url: "https://worldofbooks.com/name-of-wind",
    last_scraped_at: "2026-01-07T10:45:00Z",
  },
  {
    id: 17,
    source_id: "WOB017",
    title: "American Gods",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/american-gods-book-cover.jpg",
    source_url: "https://worldofbooks.com/american-gods",
    last_scraped_at: "2026-01-07T10:46:00Z",
  },
  {
    id: 18,
    source_id: "WOB018",
    title: "The Way of Kings",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-way-of-kings-book-cover.jpg",
    source_url: "https://worldofbooks.com/way-of-kings",
    last_scraped_at: "2026-01-07T10:47:00Z",
  },

  // Mystery/Thriller Category Books (IDs 19-26)
  {
    id: 19,
    source_id: "WOB019",
    title: "The Girl with the Dragon Tattoo",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/dragon-tattoo-cover.png",
    source_url: "https://worldofbooks.com/dragon-tattoo",
    last_scraped_at: "2026-01-07T10:48:00Z",
  },
  {
    id: 20,
    source_id: "WOB020",
    title: "Gone Girl",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/gone-girl-book-cover.jpg",
    source_url: "https://worldofbooks.com/gone-girl",
    last_scraped_at: "2026-01-07T10:49:00Z",
  },
  {
    id: 21,
    source_id: "WOB021",
    title: "The Da Vinci Code",
    price: 3.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/da-vinci-code-book-cover.jpg",
    source_url: "https://worldofbooks.com/da-vinci-code",
    last_scraped_at: "2026-01-07T10:50:00Z",
  },
  {
    id: 22,
    source_id: "WOB022",
    title: "The Silent Patient",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-silent-patient-book-cover.jpg",
    source_url: "https://worldofbooks.com/silent-patient",
    last_scraped_at: "2026-01-07T10:51:00Z",
  },
  {
    id: 23,
    source_id: "WOB023",
    title: "Big Little Lies",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/big-little-lies-book-cover.jpg",
    source_url: "https://worldofbooks.com/big-little-lies",
    last_scraped_at: "2026-01-07T10:52:00Z",
  },
  {
    id: 24,
    source_id: "WOB024",
    title: "The Woman in the Window",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/woman-in-the-window-book-cover.jpg",
    source_url: "https://worldofbooks.com/woman-in-window",
    last_scraped_at: "2026-01-07T10:53:00Z",
  },
  {
    id: 25,
    source_id: "WOB025",
    title: "And Then There Were None",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/and-then-there-were-none-book-cover.jpg",
    source_url: "https://worldofbooks.com/and-then-there-were-none",
    last_scraped_at: "2026-01-07T10:54:00Z",
  },
  {
    id: 26,
    source_id: "WOB026",
    title: "The Hound of the Baskervilles",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/hound-of-baskervilles-cover.jpg",
    source_url: "https://worldofbooks.com/hound-baskervilles",
    last_scraped_at: "2026-01-07T10:55:00Z",
  },

  // Romance Category Books (IDs 27-34)
  {
    id: 27,
    source_id: "WOB027",
    title: "Jane Eyre",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/jane-eyre-cover.jpg",
    source_url: "https://worldofbooks.com/jane-eyre",
    last_scraped_at: "2026-01-07T10:56:00Z",
  },
  {
    id: 28,
    source_id: "WOB028",
    title: "Wuthering Heights",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/wuthering-heights-cover.jpg",
    source_url: "https://worldofbooks.com/wuthering-heights",
    last_scraped_at: "2026-01-07T10:57:00Z",
  },
  {
    id: 29,
    source_id: "WOB029",
    title: "The Notebook",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-notebook-cover.jpg",
    source_url: "https://worldofbooks.com/notebook",
    last_scraped_at: "2026-01-07T10:58:00Z",
  },
  {
    id: 30,
    source_id: "WOB030",
    title: "Me Before You",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/me-before-you-cover.jpg",
    source_url: "https://worldofbooks.com/me-before-you",
    last_scraped_at: "2026-01-07T10:59:00Z",
  },
  {
    id: 31,
    source_id: "WOB031",
    title: "Outlander",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/outlander-cover.jpg",
    source_url: "https://worldofbooks.com/outlander",
    last_scraped_at: "2026-01-07T11:00:00Z",
  },
  {
    id: 32,
    source_id: "WOB032",
    title: "The Fault in Our Stars",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/fault-in-our-stars-cover.jpg",
    source_url: "https://worldofbooks.com/fault-in-our-stars",
    last_scraped_at: "2026-01-07T11:01:00Z",
  },
  {
    id: 33,
    source_id: "WOB033",
    title: "Red, White & Royal Blue",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/red-white-royal-blue-cover.jpg",
    source_url: "https://worldofbooks.com/red-white-royal-blue",
    last_scraped_at: "2026-01-07T11:02:00Z",
  },
  {
    id: 34,
    source_id: "WOB034",
    title: "The Time Traveler's Wife",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/time-travelers-wife-cover.jpg",
    source_url: "https://worldofbooks.com/time-travelers-wife",
    last_scraped_at: "2026-01-07T11:03:00Z",
  },

  // Science Fiction Category Books (IDs 35-42)
  {
    id: 35,
    source_id: "WOB035",
    title: "Dune",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/dune-cover.jpg",
    source_url: "https://worldofbooks.com/dune",
    last_scraped_at: "2026-01-07T11:04:00Z",
  },
  {
    id: 36,
    source_id: "WOB036",
    title: "The Martian",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/the-martian-cover.jpg",
    source_url: "https://worldofbooks.com/the-martian",
    last_scraped_at: "2026-01-07T11:05:00Z",
  },
  {
    id: 37,
    source_id: "WOB037",
    title: "Ender's Game",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/enders-game-cover.jpg",
    source_url: "https://worldofbooks.com/enders-game",
    last_scraped_at: "2026-01-07T11:06:00Z",
  },
  {
    id: 38,
    source_id: "WOB038",
    title: "Foundation",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/foundation-cover.jpg",
    source_url: "https://worldofbooks.com/foundation",
    last_scraped_at: "2026-01-07T11:07:00Z",
  },
  {
    id: 39,
    source_id: "WOB039",
    title: "Neuromancer",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/neuromancer-cover.jpg",
    source_url: "https://worldofbooks.com/neuromancer",
    last_scraped_at: "2026-01-07T11:08:00Z",
  },
  {
    id: 40,
    source_id: "WOB040",
    title: "The Hitchhiker's Guide to the Galaxy",
    price: 3.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/hitchhikers-guide-cover.jpg",
    source_url: "https://worldofbooks.com/hitchhikers-guide",
    last_scraped_at: "2026-01-07T11:09:00Z",
  },
  {
    id: 41,
    source_id: "WOB041",
    title: "Snow Crash",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/snow-crash-cover.jpg",
    source_url: "https://worldofbooks.com/snow-crash",
    last_scraped_at: "2026-01-07T11:10:00Z",
  },
  {
    id: 42,
    source_id: "WOB042",
    title: "The Left Hand of Darkness",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/left-hand-darkness-cover.jpg",
    source_url: "https://worldofbooks.com/left-hand-darkness",
    last_scraped_at: "2026-01-07T11:11:00Z",
  },

  // Biography/Memoir Category Books (IDs 43-50)
  {
    id: 43,
    source_id: "WOB043",
    title: "The Diary of a Young Girl",
    price: 3.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/diary-young-girl-cover.jpg",
    source_url: "https://worldofbooks.com/anne-frank",
    last_scraped_at: "2026-01-07T11:12:00Z",
  },
  {
    id: 44,
    source_id: "WOB044",
    title: "Educated",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/educated-cover.jpg",
    source_url: "https://worldofbooks.com/educated",
    last_scraped_at: "2026-01-07T11:13:00Z",
  },
  {
    id: 45,
    source_id: "WOB045",
    title: "Becoming",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/becoming-cover.jpg",
    source_url: "https://worldofbooks.com/becoming",
    last_scraped_at: "2026-01-07T11:14:00Z",
  },
  {
    id: 46,
    source_id: "WOB046",
    title: "When Breath Becomes Air",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/when-breath-becomes-air-cover.jpg",
    source_url: "https://worldofbooks.com/breath-becomes-air",
    last_scraped_at: "2026-01-07T11:15:00Z",
  },
  {
    id: 47,
    source_id: "WOB047",
    title: "Long Walk to Freedom",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/long-walk-freedom-cover.jpg",
    source_url: "https://worldofbooks.com/long-walk-freedom",
    last_scraped_at: "2026-01-07T11:16:00Z",
  },
  {
    id: 48,
    source_id: "WOB048",
    title: "The Glass Castle",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/glass-castle-cover.jpg",
    source_url: "https://worldofbooks.com/glass-castle",
    last_scraped_at: "2026-01-07T11:17:00Z",
  },
  {
    id: 49,
    source_id: "WOB049",
    title: "Steve Jobs",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/steve-jobs-cover.jpg",
    source_url: "https://worldofbooks.com/steve-jobs",
    last_scraped_at: "2026-01-07T11:18:00Z",
  },
  {
    id: 50,
    source_id: "WOB050",
    title: "Born a Crime",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/born-a-crime-cover.jpg",
    source_url: "https://worldofbooks.com/born-a-crime",
    last_scraped_at: "2026-01-07T11:19:00Z",
  },

  // History Category Books (IDs 51-58)
  {
    id: 51,
    source_id: "WOB051",
    title: "Sapiens",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/sapiens-cover.jpg",
    source_url: "https://worldofbooks.com/sapiens",
    last_scraped_at: "2026-01-07T11:20:00Z",
  },
  {
    id: 52,
    source_id: "WOB052",
    title: "Guns, Germs, and Steel",
    price: 6.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/guns-germs-steel-cover.jpg",
    source_url: "https://worldofbooks.com/guns-germs-steel",
    last_scraped_at: "2026-01-07T11:21:00Z",
  },
  {
    id: 53,
    source_id: "WOB053",
    title: "The Immortal Life of Henrietta Lacks",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/henrietta-lacks-cover.jpg",
    source_url: "https://worldofbooks.com/henrietta-lacks",
    last_scraped_at: "2026-01-07T11:22:00Z",
  },
  {
    id: 54,
    source_id: "WOB054",
    title: "A People's History of the United States",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/peoples-history-cover.jpg",
    source_url: "https://worldofbooks.com/peoples-history",
    last_scraped_at: "2026-01-07T11:23:00Z",
  },
  {
    id: 55,
    source_id: "WOB055",
    title: "The Wright Brothers",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/wright-brothers-cover.jpg",
    source_url: "https://worldofbooks.com/wright-brothers",
    last_scraped_at: "2026-01-07T11:24:00Z",
  },
  {
    id: 56,
    source_id: "WOB056",
    title: "1776",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/1776-cover.jpg",
    source_url: "https://worldofbooks.com/1776",
    last_scraped_at: "2026-01-07T11:25:00Z",
  },
  {
    id: 57,
    source_id: "WOB057",
    title: "The Silk Roads",
    price: 6.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/silk-roads-cover.jpg",
    source_url: "https://worldofbooks.com/silk-roads",
    last_scraped_at: "2026-01-07T11:26:00Z",
  },
  {
    id: 58,
    source_id: "WOB058",
    title: "Team of Rivals",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/team-of-rivals-cover.jpg",
    source_url: "https://worldofbooks.com/team-of-rivals",
    last_scraped_at: "2026-01-07T11:27:00Z",
  },

  // Self-Help/Personal Development Category Books (IDs 59-66)
  {
    id: 59,
    source_id: "WOB059",
    title: "Atomic Habits",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/atomic-habits-cover.jpg",
    source_url: "https://worldofbooks.com/atomic-habits",
    last_scraped_at: "2026-01-07T11:28:00Z",
  },
  {
    id: 60,
    source_id: "WOB060",
    title: "The Power of Habit",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/power-of-habit-cover.jpg",
    source_url: "https://worldofbooks.com/power-of-habit",
    last_scraped_at: "2026-01-07T11:29:00Z",
  },
  {
    id: 61,
    source_id: "WOB061",
    title: "The Subtle Art of Not Giving a F*ck",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/subtle-art-cover.jpg",
    source_url: "https://worldofbooks.com/subtle-art",
    last_scraped_at: "2026-01-07T11:30:00Z",
  },
  {
    id: 62,
    source_id: "WOB062",
    title: "The 7 Habits of Highly Effective People",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/7-habits-cover.jpg",
    source_url: "https://worldofbooks.com/7-habits",
    last_scraped_at: "2026-01-07T11:31:00Z",
  },
  {
    id: 63,
    source_id: "WOB063",
    title: "How to Win Friends and Influence People",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/win-friends-cover.jpg",
    source_url: "https://worldofbooks.com/win-friends",
    last_scraped_at: "2026-01-07T11:32:00Z",
  },
  {
    id: 64,
    source_id: "WOB064",
    title: "Can't Hurt Me",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/cant-hurt-me-cover.jpg",
    source_url: "https://worldofbooks.com/cant-hurt-me",
    last_scraped_at: "2026-01-07T11:33:00Z",
  },
  {
    id: 65,
    source_id: "WOB065",
    title: "Mindset",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/mindset-cover.jpg",
    source_url: "https://worldofbooks.com/mindset",
    last_scraped_at: "2026-01-07T11:34:00Z",
  },
  {
    id: 66,
    source_id: "WOB066",
    title: "Grit",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/grit-cover.jpg",
    source_url: "https://worldofbooks.com/grit",
    last_scraped_at: "2026-01-07T11:35:00Z",
  },

  // Science Category Books (IDs 67-74)
  {
    id: 67,
    source_id: "WOB067",
    title: "A Brief History of Time",
    price: 6.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/brief-history-time-cover.jpg",
    source_url: "https://worldofbooks.com/brief-history-time",
    last_scraped_at: "2026-01-07T11:36:00Z",
  },
  {
    id: 68,
    source_id: "WOB068",
    title: "The Selfish Gene",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/selfish-gene-cover.jpg",
    source_url: "https://worldofbooks.com/selfish-gene",
    last_scraped_at: "2026-01-07T11:37:00Z",
  },
  {
    id: 69,
    source_id: "WOB069",
    title: "Cosmos",
    price: 6.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/cosmos-cover.jpg",
    source_url: "https://worldofbooks.com/cosmos",
    last_scraped_at: "2026-01-07T11:38:00Z",
  },
  {
    id: 70,
    source_id: "WOB070",
    title: "The Origin of Species",
    price: 5.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/origin-species-cover.jpg",
    source_url: "https://worldofbooks.com/origin-species",
    last_scraped_at: "2026-01-07T11:39:00Z",
  },
  {
    id: 71,
    source_id: "WOB071",
    title: "Silent Spring",
    price: 4.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/silent-spring-cover.jpg",
    source_url: "https://worldofbooks.com/silent-spring",
    last_scraped_at: "2026-01-07T11:40:00Z",
  },
  {
    id: 72,
    source_id: "WOB072",
    title: "The Double Helix",
    price: 4.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/double-helix-cover.jpg",
    source_url: "https://worldofbooks.com/double-helix",
    last_scraped_at: "2026-01-07T11:41:00Z",
  },
  {
    id: 73,
    source_id: "WOB073",
    title: "The Emperor of All Maladies",
    price: 6.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/emperor-all-maladies-cover.jpg",
    source_url: "https://worldofbooks.com/emperor-maladies",
    last_scraped_at: "2026-01-07T11:42:00Z",
  },
  {
    id: 74,
    source_id: "WOB074",
    title: "The Immortalists",
    price: 5.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/immortalists-cover.jpg",
    source_url: "https://worldofbooks.com/immortalists",
    last_scraped_at: "2026-01-07T11:43:00Z",
  },

  // Children's Books Category (IDs 75-82)
  {
    id: 75,
    source_id: "WOB075",
    title: "Charlotte's Web",
    price: 3.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/charlottes-web-cover.jpg",
    source_url: "https://worldofbooks.com/charlottes-web",
    last_scraped_at: "2026-01-07T11:44:00Z",
  },
  {
    id: 76,
    source_id: "WOB076",
    title: "Matilda",
    price: 3.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/matilda-cover.jpg",
    source_url: "https://worldofbooks.com/matilda",
    last_scraped_at: "2026-01-07T11:45:00Z",
  },
  {
    id: 77,
    source_id: "WOB077",
    title: "Where the Wild Things Are",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/where-wild-things-are-cover.jpg",
    source_url: "https://worldofbooks.com/wild-things",
    last_scraped_at: "2026-01-07T11:46:00Z",
  },
  {
    id: 78,
    source_id: "WOB078",
    title: "The Giving Tree",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/giving-tree-cover.jpg",
    source_url: "https://worldofbooks.com/giving-tree",
    last_scraped_at: "2026-01-07T11:47:00Z",
  },
  {
    id: 79,
    source_id: "WOB079",
    title: "The Very Hungry Caterpillar",
    price: 2.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/hungry-caterpillar-cover.jpg",
    source_url: "https://worldofbooks.com/hungry-caterpillar",
    last_scraped_at: "2026-01-07T11:48:00Z",
  },
  {
    id: 80,
    source_id: "WOB080",
    title: "Goodnight Moon",
    price: 2.49, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/goodnight-moon-cover.jpg",
    source_url: "https://worldofbooks.com/goodnight-moon",
    last_scraped_at: "2026-01-07T11:49:00Z",
  },
  {
    id: 81,
    source_id: "WOB081",
    title: "The Cat in the Hat",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/cat-in-hat-cover.jpg",
    source_url: "https://worldofbooks.com/cat-in-hat",
    last_scraped_at: "2026-01-07T11:50:00Z",
  },
  {
    id: 82,
    source_id: "WOB082",
    title: "Green Eggs and Ham",
    price: 2.99, // Updated to World of Books pricing
    currency: "GBP",
    image_url: "/green-eggs-ham-cover.jpg",
    source_url: "https://worldofbooks.com/green-eggs-ham",
    last_scraped_at: "2026-01-07T11:51:00Z",
  },
]

export const productDetails: ProductDetail[] = products.map((product, index) => ({
  product_id: product.id,
  description: `${product.title} is a captivating read that has touched millions of readers worldwide. This edition features high-quality binding and printing, making it a perfect addition to your library.`,
  specs: {
    author: getAuthorByIndex(index),
    isbn: `978-0${Math.floor(Math.random() * 900000000 + 100000000)}`,
    pages: Math.floor(Math.random() * 400) + 150,
    publisher: ["Penguin Books", "HarperCollins", "Random House", "Simon & Schuster", "Scholastic", "Macmillan"][
      Math.floor(Math.random() * 6)
    ],
    language: "English",
    published_date: `${Math.floor(Math.random() * 30) + 1990}`,
  },
  ratings_avg: Math.round((Math.random() * 2 + 3) * 10) / 10,
  reviews_count: Math.floor(Math.random() * 500) + 50,
}))

function getAuthorByIndex(index: number): string {
  const authors = [
    // Fiction
    "Harper Lee",
    "George Orwell",
    "Jane Austen",
    "F. Scott Fitzgerald",
    "J.D. Salinger",
    "Aldous Huxley",
    "William Golding",
    "John Steinbeck",
    "Sylvia Plath",
    "Kurt Vonnegut",
    // Fantasy
    "J.K. Rowling",
    "J.R.R. Tolkien",
    "J.R.R. Tolkien",
    "C.S. Lewis",
    "George R.R. Martin",
    "Patrick Rothfuss",
    "Neil Gaiman",
    "Brandon Sanderson",
    // Mystery/Thriller
    "Stieg Larsson",
    "Gillian Flynn",
    "Dan Brown",
    "Alex Michaelides",
    "Liane Moriarty",
    "A.J. Finn",
    "Agatha Christie",
    "Arthur Conan Doyle",
    // Romance
    "Charlotte Brontë",
    "Emily Brontë",
    "Nicholas Sparks",
    "Jojo Moyes",
    "Diana Gabaldon",
    "John Green",
    "Casey McQuiston",
    "Audrey Niffenegger",
    // Science Fiction
    "Frank Herbert",
    "Andy Weir",
    "Orson Scott Card",
    "Isaac Asimov",
    "William Gibson",
    "Douglas Adams",
    "Neal Stephenson",
    "Ursula K. Le Guin",
    // Biography/Memoir
    "Anne Frank",
    "Tara Westover",
    "Michelle Obama",
    "Paul Kalanithi",
    "Nelson Mandela",
    "Jeannette Walls",
    "Walter Isaacson",
    "Trevor Noah",
    // History
    "Yuval Noah Harari",
    "Jared Diamond",
    "Rebecca Skloot",
    "Howard Zinn",
    "David McCullough",
    "David McCullough",
    "Peter Frankopan",
    "Doris Kearns Goodwin",
    // Self-Help
    "James Clear",
    "Charles Duhigg",
    "Mark Manson",
    "Stephen Covey",
    "Dale Carnegie",
    "David Goggins",
    "Carol S. Dweck",
    "Angela Duckworth",
    // Science
    "Stephen Hawking",
    "Carl Sagan",
    "Richard Dawkins",
    "Charles Darwin",
    "Neil deGrasse Tyson",
    "Siddhartha Mukherjee",
    "Walter Isaacson",
    "Peter Wohlleben",
    // Children's
    "E.B. White",
    "Maurice Sendak",
    "Eric Carle",
    "Roald Dahl",
    "Shel Silverstein",
    "Dr. Seuss",
    "Dr. Seuss",
    "Beatrix Potter",
  ]
  return authors[index] || "Unknown Author"
}

export const categories: Category[] = [
  // Parent Categories
  {
    id: 1,
    navigation_id: 1,
    parent_id: null,
    title: "Fiction",
    slug: "fiction",
    product_count: 10,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 2,
    navigation_id: 1,
    parent_id: null,
    title: "Fantasy",
    slug: "fantasy",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 3,
    navigation_id: 1,
    parent_id: null,
    title: "Mystery & Thriller",
    slug: "mystery-thriller",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 4,
    navigation_id: 1,
    parent_id: null,
    title: "Romance",
    slug: "romance",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 5,
    navigation_id: 1,
    parent_id: null,
    title: "Science Fiction",
    slug: "science-fiction",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 6,
    navigation_id: 1,
    parent_id: null,
    title: "Biography & Memoir",
    slug: "biography-memoir",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 7,
    navigation_id: 1,
    parent_id: null,
    title: "History",
    slug: "history",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 8,
    navigation_id: 1,
    parent_id: null,
    title: "Self-Help",
    slug: "self-help",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 9,
    navigation_id: 1,
    parent_id: null,
    title: "Science & Nature",
    slug: "science-nature",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 10,
    navigation_id: 1,
    parent_id: null,
    title: "Children's Books",
    slug: "childrens-books",
    product_count: 8,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Fiction Subcategories
  {
    id: 11,
    navigation_id: 1,
    parent_id: 1,
    title: "Classic Literature",
    slug: "classic-literature",
    product_count: 5,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 12,
    navigation_id: 1,
    parent_id: 1,
    title: "Contemporary Fiction",
    slug: "contemporary-fiction",
    product_count: 5,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Fantasy Subcategories
  {
    id: 13,
    navigation_id: 1,
    parent_id: 2,
    title: "Epic Fantasy",
    slug: "epic-fantasy",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 14,
    navigation_id: 1,
    parent_id: 2,
    title: "Urban Fantasy",
    slug: "urban-fantasy",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Mystery & Thriller Subcategories
  {
    id: 15,
    navigation_id: 1,
    parent_id: 3,
    title: "Crime Fiction",
    slug: "crime-fiction",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 16,
    navigation_id: 1,
    parent_id: 3,
    title: "Psychological Thriller",
    slug: "psychological-thriller",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Romance Subcategories
  {
    id: 17,
    navigation_id: 1,
    parent_id: 4,
    title: "Historical Romance",
    slug: "historical-romance",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 18,
    navigation_id: 1,
    parent_id: 4,
    title: "Contemporary Romance",
    slug: "contemporary-romance",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Science Fiction Subcategories
  {
    id: 19,
    navigation_id: 1,
    parent_id: 5,
    title: "Space Opera",
    slug: "space-opera",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 20,
    navigation_id: 1,
    parent_id: 5,
    title: "Dystopian",
    slug: "dystopian",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Biography & Memoir Subcategories
  {
    id: 21,
    navigation_id: 1,
    parent_id: 6,
    title: "Autobiography",
    slug: "autobiography",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 22,
    navigation_id: 1,
    parent_id: 6,
    title: "Memoir",
    slug: "memoir",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // History Subcategories
  {
    id: 23,
    navigation_id: 1,
    parent_id: 7,
    title: "World History",
    slug: "world-history",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 24,
    navigation_id: 1,
    parent_id: 7,
    title: "American History",
    slug: "american-history",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Self-Help Subcategories
  {
    id: 25,
    navigation_id: 1,
    parent_id: 8,
    title: "Productivity",
    slug: "productivity",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 26,
    navigation_id: 1,
    parent_id: 8,
    title: "Personal Growth",
    slug: "personal-growth",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Science & Nature Subcategories
  {
    id: 27,
    navigation_id: 1,
    parent_id: 9,
    title: "Astronomy & Space",
    slug: "astronomy-space",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 28,
    navigation_id: 1,
    parent_id: 9,
    title: "Biology & Evolution",
    slug: "biology-evolution",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },

  // Children's Books Subcategories
  {
    id: 29,
    navigation_id: 1,
    parent_id: 10,
    title: "Picture Books",
    slug: "picture-books",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
  {
    id: 30,
    navigation_id: 1,
    parent_id: 10,
    title: "Middle Grade",
    slug: "middle-grade",
    product_count: 4,
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
]

export const navigation: Navigation[] = [
  {
    id: 1,
    title: "Books",
    slug: "books",
    last_scraped_at: "2026-01-07T10:00:00Z",
  },
]

export const reviews: Review[] = [
  {
    id: 1,
    product_id: 1,
    author: "Sarah Johnson",
    rating: 5,
    text: "An absolute masterpiece! This book changed my perspective on so many things.",
    created_at: "2026-01-01T14:30:00Z",
  },
  {
    id: 2,
    product_id: 1,
    author: "Michael Chen",
    rating: 5,
    text: "A must-read for everyone. The storytelling is exceptional.",
    created_at: "2026-01-02T09:15:00Z",
  },
  {
    id: 3,
    product_id: 2,
    author: "Emma Williams",
    rating: 5,
    text: "Dystopian brilliance. More relevant today than ever before.",
    created_at: "2026-01-03T16:45:00Z",
  },
  {
    id: 4,
    product_id: 2,
    author: "David Brown",
    rating: 4,
    text: "A haunting vision of the future. Highly recommended.",
    created_at: "2026-01-04T11:20:00Z",
  },
  {
    id: 5,
    product_id: 3,
    author: "Jennifer Davis",
    rating: 5,
    text: "Jane Austen at her finest. The wit and romance are timeless.",
    created_at: "2026-01-05T13:00:00Z",
  },
]

export const scrapeJobs: ScrapeJob[] = [
  {
    id: 1,
    target_url: "https://worldofbooks.com/category/fiction",
    target_type: "category",
    status: "completed",
    started_at: "2026-01-07T09:00:00Z",
    finished_at: "2026-01-07T09:15:00Z",
    error_log: null,
  },
  {
    id: 2,
    target_url: "https://worldofbooks.com/category/non-fiction",
    target_type: "category",
    status: "completed",
    started_at: "2026-01-07T09:15:00Z",
    finished_at: "2026-01-07T09:30:00Z",
    error_log: null,
  },
  {
    id: 3,
    target_url: "https://worldofbooks.com/products/all",
    target_type: "product",
    status: "completed",
    started_at: "2026-01-07T09:30:00Z",
    finished_at: "2026-01-07T11:00:00Z",
    error_log: null,
  },
  {
    id: 4,
    target_url: "https://worldofbooks.com/reviews",
    target_type: "review",
    status: "running",
    started_at: "2026-01-07T11:00:00Z",
    finished_at: null,
    error_log: null,
  },
  {
    id: 5,
    target_url: "https://worldofbooks.com/category/science",
    target_type: "category",
    status: "failed",
    started_at: "2026-01-07T08:00:00Z",
    finished_at: "2026-01-07T08:05:00Z",
    error_log: "Connection timeout after 5 seconds",
  },
]

export const viewHistory: ViewHistory[] = []

export function getProductsByCategory(categorySlug: string): Product[] {
  const categoryMap: { [key: string]: number[] } = {
    // Parent categories
    fiction: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    fantasy: [11, 12, 13, 14, 15, 16, 17, 18],
    "mystery-thriller": [19, 20, 21, 22, 23, 24, 25, 26],
    romance: [27, 28, 29, 30, 31, 32, 33, 34],
    "science-fiction": [35, 36, 37, 38, 39, 40, 41, 42],
    "biography-memoir": [43, 44, 45, 46, 47, 48, 49, 50],
    history: [51, 52, 53, 54, 55, 56, 57, 58],
    "self-help": [59, 60, 61, 62, 63, 64, 65, 66],
    "science-nature": [67, 68, 69, 70, 71, 72, 73, 74],
    "childrens-books": [75, 76, 77, 78, 79, 80, 81, 82],

    // Fiction subcategories
    "classic-literature": [1, 3, 4, 5, 6],
    "contemporary-fiction": [2, 7, 8, 9, 10],

    // Fantasy subcategories
    "epic-fantasy": [12, 13, 15, 18],
    "urban-fantasy": [11, 14, 16, 17],

    // Mystery & Thriller subcategories
    "crime-fiction": [19, 21, 25, 26],
    "psychological-thriller": [20, 22, 23, 24],

    // Romance subcategories
    "historical-romance": [27, 28, 31, 34],
    "contemporary-romance": [29, 30, 32, 33],

    // Science Fiction subcategories
    "space-opera": [35, 38, 41, 42],
    dystopian: [36, 37, 39, 40],

    // Biography & Memoir subcategories
    autobiography: [43, 45, 47, 49],
    memoir: [44, 46, 48, 50],

    // History subcategories
    "world-history": [51, 52, 57, 58],
    "american-history": [53, 54, 55, 56],

    // Self-Help subcategories
    productivity: [59, 60, 62, 65],
    "personal-growth": [61, 63, 64, 66],

    // Science & Nature subcategories
    "astronomy-space": [67, 68, 71, 72],
    "biology-evolution": [69, 70, 73, 74],

    // Children's Books subcategories
    "picture-books": [75, 76, 77, 79],
    "middle-grade": [78, 80, 81, 82],
  }

  const productIds = categoryMap[categorySlug] || []
  return products.filter((p) => productIds.includes(p.id))
}

// Helper function to track view history
export function addViewHistory(sessionId: string, path: string) {
  viewHistory.push({
    id: viewHistory.length + 1,
    user_id: null,
    session_id: sessionId,
    path_json: JSON.stringify({ path, timestamp: new Date().toISOString() }),
    created_at: new Date().toISOString(),
  })
}

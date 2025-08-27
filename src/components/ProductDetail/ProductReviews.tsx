import { Star, User, Heart, PawPrint, ThumbsUp, Shield, CheckCircle, Award } from "lucide-react";
import { RatingStars } from "@/components/ui/RatingStars";
import { Product } from "@/store/slices/productsSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  product: Product;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  petName?: string;
  petType?: string;
  helpfulVotes: number;
  images?: string[];
}

const petAvatars = ['🐕', '🐱', '🐰', '🐦', '🐹'];

const dummyReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah M.",
    rating: 5,
    title: "Luna absolutely loves this! Best purchase ever! 🐕",
    comment: "My Golden Retriever Luna has been using this for 3 months now and she's obsessed! The quality is outstanding and it's held up perfectly despite her enthusiastic play style. Worth every penny!",
    date: "2024-01-15",
    verified: true,
    petName: "Luna",
    petType: "Golden Retriever",
    helpfulVotes: 24,
    images: ["review1.jpg", "review1_2.jpg"]
  },
  {
    id: "2",
    userId: "user2",
    userName: "Marcus T.",
    rating: 4,
    title: "Great product, my cats approve! 🐱",
    comment: "Both my cats, Whiskers and Shadow, took to this immediately. The material feels premium and it's easy to clean. Only minor complaint is it took a week to arrive, but the quality makes up for it!",
    date: "2024-01-10",
    verified: true,
    petName: "Whiskers & Shadow",
    petType: "Domestic Shorthair",
    helpfulVotes: 18,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Jennifer K.",
    rating: 5,
    title: "Exceeded all my expectations! 🌟",
    comment: "I was hesitant at first, but this has been a game-changer for my pup Max. He's a rescue and was very picky about his things, but he loves this! The design is beautiful too and matches my home décor perfectly.",
    date: "2024-01-08",
    verified: false,
    petName: "Max",
    petType: "Mixed Breed",
    helpfulVotes: 31,
  },
  {
    id: "4",
    userId: "user4",
    userName: "David R.",
    rating: 5,
    title: "Perfect for my senior dog 🐕‍🦺",
    comment: "My 12-year-old German Shepherd, Bruno, has arthritis and this has provided him so much comfort. The support is excellent and he sleeps through the night now. Highly recommend for senior pets!",
    date: "2024-01-05",
    verified: true,
    petName: "Bruno",
    petType: "German Shepherd",
    helpfulVotes: 15,
  },
];

export const ProductReviews = ({ product }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const ratingDistribution = [
    { stars: 5, count: Math.floor(product.reviewCount * 0.65), percentage: 65 },
    { stars: 4, count: Math.floor(product.reviewCount * 0.25), percentage: 25 },
    { stars: 3, count: Math.floor(product.reviewCount * 0.08), percentage: 8 },
    { stars: 2, count: Math.floor(product.reviewCount * 0.01), percentage: 1 },
    { stars: 1, count: Math.floor(product.reviewCount * 0.01), percentage: 1 },
  ];

  const sortedReviews = [...dummyReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <PawPrint className="w-8 h-8 text-amber-500" />
        <h2 className="text-3xl font-bold text-gray-900">Pet Parent Reviews</h2>
        <Heart className="w-6 h-6 text-red-400 fill-current animate-heart-beat" />
      </div>

      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-amber-600 mb-2">{product.rating}</div>
                <RatingStars rating={product.rating} size="lg" className="justify-center mb-3" />
                <p className="text-gray-600 font-medium">
                  Based on <span className="text-amber-600 font-bold">{product.reviewCount}</span> reviews
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-semibold">Pet Approved Product</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">95% of pet parents recommend this product</p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h4>
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium w-2">{rating.stars}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-400 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium w-12 text-right">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-amber-100" />

      {/* Review Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <PawPrint className="w-5 h-5 mr-2" />
          Share Your Pet's Experience
        </Button>

        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            <option value="newest">Newest First</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <Separator className="bg-amber-100" />

      {/* Individual Reviews */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold text-gray-900">What Pet Parents Say</h3>
          <Heart className="w-6 h-6 text-red-400 fill-current" />
        </div>

        {sortedReviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-white border-2 border-gray-100 hover:border-amber-200 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:shadow-lg"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-200">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">{review.userName}</span>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                        <Shield className="w-3 h-3" />
                        Verified Purchase
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <RatingStars rating={review.rating} size="sm" />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {review.petName && review.petType && (
                    <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded-full w-fit">
                      <PawPrint className="w-3 h-3" />
                      <span className="font-medium">{review.petName}</span>
                      <span>•</span>
                      <span>{review.petType}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-gray-900 leading-relaxed">
                {review.title}
              </h4>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {review.comment}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((image, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-500">
                      📸 Photo {i + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors text-sm font-medium">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpfulVotes})</span>
              </button>

              {review.verified && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified pet parent</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Load More Reviews */}
        <div className="text-center pt-6">
          <Button
            variant="outline"
            className="border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 font-semibold px-8 py-3 rounded-2xl"
          >
            Load More Pet Reviews
            <PawPrint className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      
    </section>
  );
};

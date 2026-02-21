import { useState, useEffect } from 'react';


export const getInstagramFeed = async (feedURL: string) => {
    console.log("Fetching insta...");
    try {
        const response = await fetch(feedURL);
        const data = await response.json();
        
        // Return the formatted data directly
        return data.posts.map((post: any) => ({
            id: post.id,
            image: post.thumbnailUrl ?? post.mediaUrl,
            link: post.permalink,
        }));
    } catch (error) {
        console.error("Failed to load Instagram feed", error);
        return []; // Return empty array on error
    }
};
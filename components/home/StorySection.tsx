import React from "react";
import Image from "next/image";

export default function StorySection() {
  return (
    <section className="section section-alt" id="story">
      <div className="container">
        <div className="story-grid">
          <div className="story-media">
            <Image
              src="/images/specials-south-indian.jpg"
              alt="Authentic South Indian feast preparation"
              width={600}
              height={450}
              className="story-img-main"
            />
            <div className="story-badge-quote">
              <p>
                &ldquo;Sooru is not just food. It is the embrace of a mother, the warmth of the village kitchen, and memory served on a leaf.&rdquo;
              </p>
            </div>
          </div>

          <div className="story-body">
            <div className="eyebrow">Our Philosophy</div>
            <h2>The Soul of Sooru &amp; Stories</h2>
            <p className="story-text">
              In the Tamil heartlands, asking someone if they had <em>&ldquo;Sooru&rdquo;</em> is the deepest 
              expression of affection. At <strong>Sooru &amp; Stories</strong>, we preserve culinary traditions 
              that commercial restaurant kitchens often abandon. 
            </p>
            <p className="story-text">
              We never use artificial colors, MSG, or frozen premixes. Every morning, our chefs begin with 
              dry-roasting whole spices, simmering country toor dal in heavy earthern pots, and preparing 
              native healing broths that comfort the soul.
            </p>

            <div className="story-pillars">
              <div className="pillar-item">
                <div className="pillar-title">🍲 Clay Pot Simmering</div>
                <div className="pillar-desc">
                  Slow thermal diffusion preserving volatile spice aromatics and alkaline minerals.
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-title">🌾 Seeraga Samba Purity</div>
                <div className="pillar-desc">
                  Tiny, fragrant indigenous rice grains prized for gentle digestion and royal biryanis.
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-title">🌿 Medicinal Botanicals</div>
                <div className="pillar-desc">
                  Mudakathan, Moringa, and raw tamarind harvested fresh from local farm co-ops.
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-title">🧈 Pure Country Ghee</div>
                <div className="pillar-desc">
                  Clarified butter crafted traditionally from local A2 cow milk with cardamom whisper.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

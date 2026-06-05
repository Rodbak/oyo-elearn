import Mux from "@mux/mux-node";

const mux = process.env.MUX_TOKEN_ID
  ? new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET!,
    })
  : null;

export async function createDirectUpload() {
  if (!mux) return null;

  const upload = await mux.video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_APP_URL ?? "*",
    new_asset_settings: {
      playback_policy: ["public"],
    },
  });

  return upload;
}

export async function getAssetPlaybackId(assetId: string) {
  if (!mux) return null;
  const asset = await mux.video.assets.retrieve(assetId);
  return asset.playback_ids?.[0]?.id ?? null;
}

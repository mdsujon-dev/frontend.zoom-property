import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { getLandownerBlockPage } from "@/server/features/landowners";
import { LandownerFeed } from "./landowner-feed";

/** How many blocks are on one page. */
const PER_PAGE = 4;

/**
 * The landowner blocks: a photograph, a heading, a passage.
 *
 * Written and ordered in the panel. The sides alternate as the list runs —
 * picture left, then picture right — because a column of identical rows reads
 * as a table, and the desk should not have to think about layout to get a page
 * that looks composed.
 *
 * Paged through the URL rather than in the browser: each page is a real
 * address, so it can be linked, shared and indexed, and the page number
 * survives a refresh. The links carry `#landowner-blocks` so paging lands on
 * the section rather than scrolling the reader back to the banner.
 *
 * The whole section removes itself when nothing is published rather than
 * leaving a gap between the benefits and the steps.
 */
export async function LandownerBlocks({ page = 1 }: { page?: number }) {
  const [dict, locale, result] = await Promise.all([
    getDictionary(),
    getLocale(),
    getLandownerBlockPage(page, PER_PAGE),
  ]);

  if (!result.blocks.length) return null;

  const isBn = locale === "bn";
  const t = dict.landowners;
  const base = localeHref(locale, "/landowners");

  const { blocks, total, totalPages, page: current, from } = result;

  return (
    <LandownerFeed
      blocks={blocks}
      total={total}
      totalPages={totalPages}
      current={current}
      from={from}
      isBn={isBn}
      t={t}
      basePath={base}
    />
  );
}

export default LandownerBlocks;

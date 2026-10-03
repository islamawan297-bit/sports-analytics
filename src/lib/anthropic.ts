import Anthropic from '@anthropic-ai/sdk';

/**
 * Centralized Anthropic Model Registry
 * Maps subscription tiers to currently supported Anthropic model IDs.
 */
export const CLAUDE_MODELS = {
  // Lower-cost / Free Tier
  HAIKU: process.env.ANTHROPIC_MODEL_HAIKU || 'claude-3-5-haiku-latest',
  // Default / Creator / Pro Tier
  SONNET: process.env.ANTHROPIC_MODEL_SONNET || 'claude-3-7-sonnet-latest',
  // Highest / Enterprise Tier
  OPUS: process.env.ANTHROPIC_MODEL_OPUS || 'claude-3-opus-latest',
} as const;

export type ClaudeTier = 'FREE' | 'CREATOR' | 'PRO' | 'ENTERPRISE' | string;

/**
 * Resolves the appropriate Claude model ID for a given user subscription tier.
 */
export function getModelForTier(tier?: ClaudeTier): string {
  switch (tier?.toUpperCase()) {
    case 'FREE':
      return CLAUDE_MODELS.HAIKU;
    case 'CREATOR':
    case 'PRO':
      return CLAUDE_MODELS.SONNET;
    case 'ENTERPRISE':
      return CLAUDE_MODELS.OPUS;
    default:
      return CLAUDE_MODELS.SONNET;
  }
}

export interface AnthropicCompletionOptions {
  prompt: string;
  systemPrompt?: string;
  tier?: ClaudeTier;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AnthropicResponse {
  text: string;
  isRealAi: boolean;
  provider: string;
  modelUsed: string;
  error?: string;
}

/**
 * Server-side Anthropic AI Client Utility
 * Uses process.env.ANTHROPIC_API_KEY exclusively on server side.
 * Never exposes keys or credentials to frontend client code.
 */
export async function generateAnthropicCompletion(
  options: AnthropicCompletionOptions
): Promise<AnthropicResponse> {
  const rawKey = String(process.env.ANTHROPIC_API_KEY || '').trim();

  const model = options.model || getModelForTier(options.tier);

  if (!rawKey) {
    return {
      text: '',
      isRealAi: false,
      provider: 'Anthropic Claude Engine',
      modelUsed: model,
      error: 'ANTHROPIC_API_KEY is not configured in server environment variables.',
    };
  }

  try {
    const client = new Anthropic({
      apiKey: rawKey,
    });

    const response = await client.messages.create({
      model,
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature ?? 0.5,
      system: options.systemPrompt || 'You are StatsEdge AI, a professional sports analytics model.',
      messages: [
        {
          role: 'user',
          content: options.prompt,
        },
      ],
    });

    const firstContentBlock = response.content?.[0];
    const textOutput = firstContentBlock && firstContentBlock.type === 'text' ? firstContentBlock.text.trim() : '';

    if (!textOutput) {
      return {
        text: '',
        isRealAi: false,
        provider: 'Anthropic Claude Engine',
        modelUsed: model,
        error: 'Empty response returned from Anthropic API.',
      };
    }

    return {
      text: textOutput,
      isRealAi: true,
      provider: `Anthropic ${model}`,
      modelUsed: model,
    };
  } catch (err: any) {
    const errorMessage = err?.message || 'Unknown Anthropic API error';
    const status = err?.status;

    let friendlyError = errorMessage;
    if (status === 429 || errorMessage.includes('rate_limit') || errorMessage.includes('quota')) {
      friendlyError = 'Anthropic API rate limit or quota exceeded (HTTP 429).';
    } else if (status === 401 || errorMessage.includes('authentication')) {
      friendlyError = 'Invalid Anthropic API Key (HTTP 401).';
    }

    return {
      text: '',
      isRealAi: false,
      provider: 'Anthropic Claude Engine',
      modelUsed: model,
      error: friendlyError,
    };
  }
}

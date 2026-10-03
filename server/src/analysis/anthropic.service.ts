import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Centralized Anthropic Model Registry for NestJS Backend
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

export interface AnthropicInsightOptions {
  prompt: string;
  systemPrompt?: string;
  tier?: ClaudeTier;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AnthropicServiceResponse {
  insight: string;
  isRealAi: boolean;
  provider: string;
  modelUsed: string;
  error?: string;
}

@Injectable()
export class AnthropicAiService {
  private readonly logger = new Logger(AnthropicAiService.name);

  /**
   * Generates completion using Anthropic Claude models.
   * Accesses ANTHROPIC_API_KEY strictly on the server side.
   */
  async generateCompletion(options: AnthropicInsightOptions): Promise<AnthropicServiceResponse> {
    const rawKey = String(process.env.ANTHROPIC_API_KEY || '').trim();
    const model = options.model || getModelForTier(options.tier);

    if (!rawKey) {
      this.logger.warn('ANTHROPIC_API_KEY is not configured in environment variables.');
      return {
        insight: '',
        isRealAi: false,
        provider: 'Anthropic Claude Engine',
        modelUsed: model,
        error: 'ANTHROPIC_API_KEY missing in server environment.',
      };
    }

    try {
      const client = new Anthropic({ apiKey: rawKey });

      const response = await client.messages.create({
        model,
        max_tokens: options.maxTokens || 1024,
        temperature: options.temperature ?? 0.5,
        system: options.systemPrompt || 'You are StatsEdge AI, a professional sports analytics model.',
        messages: [{ role: 'user', content: options.prompt }],
      });

      const firstBlock = response.content?.[0];
      const text = firstBlock && firstBlock.type === 'text' ? firstBlock.text.trim() : '';

      if (!text) {
        return {
          insight: '',
          isRealAi: false,
          provider: 'Anthropic Claude Engine',
          modelUsed: model,
          error: 'Empty response returned from Anthropic API.',
        };
      }

      return {
        insight: text,
        isRealAi: true,
        provider: `Anthropic ${model}`,
        modelUsed: model,
      };
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown Anthropic API error';
      this.logger.error(`Anthropic API error (${model}): ${errorMessage}`);

      return {
        insight: '',
        isRealAi: false,
        provider: 'Anthropic Claude Engine',
        modelUsed: model,
        error: errorMessage,
      };
    }
  }
}
